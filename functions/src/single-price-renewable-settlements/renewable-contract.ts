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
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    // Bidを価格の高い順に並び替える
    const renewableBids = await renewable_bid.list();
    if (!renewableBids || !renewableBids.length) {
      return;
    }
    const sortRenewableBids = renewableBids.sort((first, second) => second.price - first.price);

    // Askを価格の低い順に並び替える
    const renewableAsks = await renewable_ask.list();
    if (!renewableAsks || !renewableAsks.length) {
      return;
    }
    const sortRenewableAsks = renewableAsks.sort((first, second) => first.price - second.price);

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
    const condition = true;
    while (condition) {
      if (sortRenewableBids[i].price <= sortRenewableAsks[j].price) {
        break;
      }
      if (sumBidAmountHistory[i] <= sumAskAmountHistory[j]) {
        i++;
      } else {
        j++;
      }
    }

    // i,j両方が0のとき、成約は0になる
    if (i == 0 && j == 0) {
      const marketStatus = await market_status.getToday();
      console.log('SPX成約は0です。', marketStatus);
      if (!marketStatus.length) {
        await market_status.create(new MarketStatus({ is_finished_normal: false, is_finished_renewable: true }));
      } else {
        await market_status.update(new MarketStatus({ id: marketStatus[0].id, is_finished_renewable: true }));
      }

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
    } else {
      // 止まったときの高い方の価格が均衡価格となる
      const equilibriumPrice =
        sortRenewableBids[i].price <= sortRenewableAsks[j].price ? sortRenewableAsks[i].price : sortRenewableBids[j].price;
      // 止まったときの低い方が成約取引量となる
      const equilibriumAmount = sumBidAmountHistory[i] <= sumAskAmountHistory[j] ? sumBidAmountHistory[i] : sumAskAmountHistory[j];

      await single_price_renewable_settlement.create(
        new SinglePriceRenewableSettlement({
          price: equilibriumPrice,
          amount: equilibriumAmount,
        }),
      );
    }
  });
