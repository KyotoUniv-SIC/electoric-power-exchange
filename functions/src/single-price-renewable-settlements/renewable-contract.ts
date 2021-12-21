/* eslint-disable camelcase */
import { single_price_renewable_settlement } from '.';
import { market_status } from '../market-statuses';
import { renewable_ask } from '../renewable-asks';
import { renewable_bid } from '../renewable-bids';
import { MarketStatus, SinglePriceRenewableSettlement } from '@local/common';
import * as functions from 'firebase-functions';

module.exports.renewableContract = functions.pubsub
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
      const marketStatus = await market_status.list();
      if (!marketStatus.length) {
        await market_status.create(new MarketStatus({ is_finished_normal: false, is_finished_renewable: true }));
      } else {
        await market_status.update(new MarketStatus({ is_finished_renewable: true }));
      }
    } else {
      // 止まったときの高い方の価格が均衡価格となる
      const equilibriumPrice =
        sortRenewableBids[i].price <= sortRenewableAsks[j].price ? sortRenewableAsks[i].price : sortRenewableBids[j].price;
      // 止まったときの低い方が成約取引量となる
      const equilibriumAmount =
        sortRenewableBids[i].amount <= sortRenewableAsks[j].amount ? sortRenewableBids[i].amount : sortRenewableAsks[j].amount;

      await single_price_renewable_settlement.create(
        new SinglePriceRenewableSettlement({
          price: equilibriumPrice,
          amount: equilibriumAmount,
        }),
      );
    }
  });
