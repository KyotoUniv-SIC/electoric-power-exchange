/* eslint-disable camelcase */
import { single_price_renewable_settlement } from '.';
import { market_status } from '../market-statuses';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_ask } from '../renewable-asks';
import { renewable_bid_history } from '../renewable-bid-histories';
import { renewable_bid } from '../renewable-bids';
import { MarketStatus, RenewableAskHistory, RenewableBidHistory, SinglePriceRenewableSettlement } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.renewableContract = f.pubsub
  .schedule('0 0 * * *')
  // .schedule('every 10 minutes')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const renewableBids = await renewable_bid.listValid();
    const renewableAsks = await renewable_ask.listValid();
    const marketStatus = await market_status.getToday();
    // bidかaskが0の場合は0成約で終了する
    if (!renewableBids.length || !renewableAsks.length) {
      console.log('bid,askの不足でSPX成約は0です。');
      if (!marketStatus.length) {
        await market_status.create(new MarketStatus({ is_finished_normal: false, is_finished_renewable: true }));
      } else {
        await market_status.update({ id: marketStatus[0].id, is_finished_renewable: true });
      }
      console.log(marketStatus);

      for (const bid of renewableBids) {
        await renewable_bid_history.create(
          new RenewableBidHistory({
            account_id: bid.account_id,
            price: bid.price,
            amount: bid.amount,
            is_accepted: false,
          }),
        );
        await renewable_bid.delete_(bid.id);
      }

      for (const ask of renewableAsks) {
        await renewable_ask_history.create(
          new RenewableAskHistory({
            account_id: ask.account_id,
            price: ask.price,
            amount: ask.amount,
            is_accepted: false,
          }),
        );
        await renewable_ask.delete_(ask.id);
      }
      return;
    }

    // Bidを価格の高い順に並び替える
    const sortRenewableBids = renewableBids.sort((first, second) => second.price - first.price);

    // Askを価格の低い順に並び替える
    const sortRenewableAsks = renewableAsks.sort((first, second) => first.price - second.price);

    // i,j両方が0のとき、成約は0になる
    if (sortRenewableBids[0].price < sortRenewableAsks[0].price) {
      console.log('SPX成約はありませんでした。');
      if (!marketStatus.length) {
        await market_status.create(new MarketStatus({ is_finished_normal: false, is_finished_renewable: true }));
      } else {
        await market_status.update({ id: marketStatus[0].id, is_finished_renewable: true });
      }
      console.log(marketStatus);

      for (const bid of sortRenewableBids) {
        await renewable_bid_history.create(
          new RenewableBidHistory({
            account_id: bid.account_id,
            price: bid.price,
            amount: bid.amount,
            is_accepted: false,
          }),
        );
        await renewable_bid.delete_(bid.id);
      }

      for (const ask of sortRenewableAsks) {
        await renewable_ask_history.create(
          new RenewableAskHistory({
            account_id: ask.account_id,
            price: ask.price,
            amount: ask.amount,
            is_accepted: false,
          }),
        );
        await renewable_ask.delete_(ask.id);
      }
      return;
    }

    // Bidの量の推移を配列にする
    let sumBidAmount = 0;
    const sumBidAmountHistory = [];
    for (const bid of sortRenewableBids) {
      sumBidAmount += bid.amount;
      sumBidAmountHistory.push(sumBidAmount);
    }

    // Askの量の推移を配列にする
    let sumAskAmount = 0;
    const sumAskAmountHistory = [];
    for (const ask of sortRenewableAsks) {
      sumAskAmount += ask.amount;
      sumAskAmountHistory.push(sumAskAmount);
    }

    // 階段状の累積受給曲線を歩調を合わせて登ることで均衡価格を発見
    let i = 0;
    let j = 0;
    let equilibriumPrice = 0;
    let equilibriumAmount = 0;
    const condition = true;
    while (condition) {
      if (sortRenewableBids[i].price <= sortRenewableAsks[j].price) {
        break;
      }
      if (sumBidAmountHistory[i] <= sumAskAmountHistory[j]) {
        equilibriumPrice = sortRenewableAsks[j].price;
        equilibriumAmount = sumBidAmountHistory[i];
        if (!sortRenewableBids[i + 1]) {
          break;
        }
        i++;
      } else {
        equilibriumPrice = sortRenewableBids[i].price;
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

    await single_price_renewable_settlement.create(
      new SinglePriceRenewableSettlement({
        price: equilibriumPrice,
        amount: equilibriumAmount,
      }),
    );
  });
