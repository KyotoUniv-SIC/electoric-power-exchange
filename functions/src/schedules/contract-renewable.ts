/* eslint-disable camelcase */
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_ask } from '../renewable-asks';
import { renewable_bid_history } from '../renewable-bid-histories';
import { renewable_bid } from '../renewable-bids';
import { single_price_renewable_settlement } from '../single-price-renewable-settlements';
import { singlePriceRenewableSettlementOnCreate } from '../single-price-renewable-settlements/create-renewable-settlement';
import { proto, RenewableAskHistory, RenewableBidHistory, SinglePriceRenewableSettlement } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, memory: '2GB', secrets: ['PRIV_KEY'] });
module.exports.contractRenewable = f.pubsub
  .schedule('15 9 * * *')
  // .schedule('0,30 * * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const renewableBids = await renewable_bid.listValid();
    const renewableAsks = await renewable_ask.listValid();
    // bidかaskが0の場合は0成約で終了する
    if (!renewableBids.length || !renewableAsks.length) {
      console.log('bid,askの不足でSPX成約は0です。');

      await single_price_renewable_settlement.create(
        new SinglePriceRenewableSettlement({
          price_ujpy: '0',
          amount_uspx: '0',
        }),
      );

      await Promise.all(
        renewableBids.map(async (bid) => {
          await renewable_bid_history.create(
            new RenewableBidHistory(
              {
                account_id: bid.account_id,
                price_ujpy: bid.price_ujpy,
                amount_uspx: bid.amount_uspx,
                is_accepted: false,
                contract_price_ujpy: '0',
              },
              bid.created_at,
            ),
          );
          await renewable_bid.delete_(bid.id);
        }),
      );

      await Promise.all(
        renewableAsks.map(async (ask) => {
          await renewable_ask_history.create(
            new RenewableAskHistory(
              {
                type: ask.type as unknown as proto.main.RenewableAskHistoryType,
                account_id: ask.account_id,
                price_ujpy: ask.price_ujpy,
                amount_uspx: ask.amount_uspx,
                is_accepted: false,
                contract_price_ujpy: '0',
              },
              ask.created_at,
            ),
          );
          await renewable_ask.delete_(ask.id);
        }),
      );

      return;
    }

    // Bidを価格の高い順に並び替える
    const sortRenewableBids = renewableBids.sort((first, second) => parseInt(second.price_ujpy) - parseInt(first.price_ujpy));

    // Askを価格の低い順に並び替える
    const sortRenewableAsks = renewableAsks.sort((first, second) => parseInt(first.price_ujpy) - parseInt(second.price_ujpy));

    // i,j両方が0のとき、成約は0になる
    if (parseInt(sortRenewableBids[0].price_ujpy) < parseInt(sortRenewableAsks[0].price_ujpy)) {
      console.log('SPX成約はありませんでした。');

      await single_price_renewable_settlement.create(
        new SinglePriceRenewableSettlement({
          price_ujpy: '0',
          amount_uspx: '0',
        }),
      );

      await Promise.all(
        sortRenewableBids.map(async (bid) => {
          await renewable_bid_history.create(
            new RenewableBidHistory(
              {
                account_id: bid.account_id,
                price_ujpy: bid.price_ujpy,
                amount_uspx: bid.amount_uspx,
                is_accepted: false,
                contract_price_ujpy: '0',
              },
              bid.created_at,
            ),
          );
          await renewable_bid.delete_(bid.id);
        }),
      );

      await Promise.all(
        sortRenewableAsks.map(async (ask) => {
          await renewable_ask_history.create(
            new RenewableAskHistory(
              {
                type: ask.type as unknown as proto.main.RenewableAskHistoryType,
                account_id: ask.account_id,
                price_ujpy: ask.price_ujpy,
                amount_uspx: ask.amount_uspx,
                is_accepted: false,
                contract_price_ujpy: '0',
              },
              ask.created_at,
            ),
          );
          await renewable_ask.delete_(ask.id);
        }),
      );

      return;
    }

    // Bidの量の推移を配列にする
    let sumBidAmount = 0;
    const sumBidAmountHistory = [];
    for (const bid of sortRenewableBids) {
      sumBidAmount += parseInt(bid.amount_uspx);
      sumBidAmountHistory.push(sumBidAmount);
    }

    // Askの量の推移を配列にする
    let sumAskAmount = 0;
    const sumAskAmountHistory = [];
    for (const ask of sortRenewableAsks) {
      sumAskAmount += parseInt(ask.amount_uspx);
      sumAskAmountHistory.push(sumAskAmount);
    }

    // 階段状の累積受給曲線を歩調を合わせて登ることで均衡価格を発見
    let i = 0;
    let j = 0;
    let equilibriumPrice = 0;
    let equilibriumAmount = 0;
    const condition = true;
    while (condition) {
      if (parseInt(sortRenewableBids[i].price_ujpy) < parseInt(sortRenewableAsks[j].price_ujpy)) {
        break;
      }
      if (sumBidAmountHistory[i] <= sumAskAmountHistory[j]) {
        equilibriumPrice = parseInt(sortRenewableAsks[j].price_ujpy);
        equilibriumAmount = sumBidAmountHistory[i];
        if (!sortRenewableBids[i + 1]) {
          break;
        }
        i++;
      } else {
        equilibriumPrice = parseInt(sortRenewableBids[i].price_ujpy);
        equilibriumAmount = sumAskAmountHistory[j];
        if (!sortRenewableAsks[j + 1]) {
          break;
        }
        j++;
      }
    }

    // 止まったときの低い方の価格が均衡価格となる
    // const equilibriumPrice =
    //   sortRenewableBids[i].price <= sortRenewableAsks[j].price ? sortRenewableBids[i].price : sortRenewableAsks[j].price;
    // 止まったときの低い方が成約取引量となる
    // const equilibriumAmount = sumBidAmountHistory[i] <= sumAskAmountHistory[j] ? sumBidAmountHistory[i] : sumAskAmountHistory[j];

    const singlePrice = new SinglePriceRenewableSettlement({
      price_ujpy: equilibriumPrice.toString(),
      amount_uspx: equilibriumAmount.toString(),
    });
    await single_price_renewable_settlement.create(singlePrice);

    if (equilibriumAmount == 0) {
      await Promise.all(
        sortRenewableBids.map(async (bid) => {
          await renewable_bid_history.create(
            new RenewableBidHistory(
              {
                account_id: bid.account_id,
                price_ujpy: bid.price_ujpy,
                amount_uspx: bid.amount_uspx,
                is_accepted: false,
                contract_price_ujpy: '0',
              },
              bid.created_at,
            ),
          );
          await renewable_bid.delete_(bid.id);
        }),
      );

      await Promise.all(
        sortRenewableAsks.map(async (ask) => {
          await renewable_ask_history.create(
            new RenewableAskHistory(
              {
                type: ask.type as unknown as proto.main.RenewableAskHistoryType,
                account_id: ask.account_id,
                price_ujpy: ask.price_ujpy,
                amount_uspx: ask.amount_uspx,
                is_accepted: false,
                contract_price_ujpy: '0',
              },
              ask.created_at,
            ),
          );
          await renewable_ask.delete_(ask.id);
        }),
      );
    } else {
      await singlePriceRenewableSettlementOnCreate({ data: () => singlePrice }, null);
    }
  });
