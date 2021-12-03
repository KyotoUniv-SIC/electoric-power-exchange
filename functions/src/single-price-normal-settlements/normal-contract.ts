/* eslint-disable camelcase */
import { single_price_normal_settlement } from '.';
import { normal_ask } from '../normal-asks';
import { normal_bid } from '../normal-bids';
import { SinglePriceNormalSettlement } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    // Bidを価格の高い順に並び替える
    const normalBids = await normal_bid.list();
    if (!normalBids || !normalBids.length) {
      return;
    }
    const sortNormalBids = normalBids.sort((first, second) => second.price - first.price);

    // Askを価格の低い順に並び替える
    const normalAsks = await normal_ask.list();
    if (!normalAsks || !normalAsks.length) {
      return;
    }
    const sortNormalAsks = normalAsks.sort((first, second) => first.price - second.price);

    // Bidの量の推移を配列にする
    let sumBidAmount = 0;
    const sumBidAmountHistory = [];
    for (const bid of sortNormalBids) {
      sumBidAmount += bid.amount;
      sumBidAmountHistory.push(sumBidAmount);
    }

    // Askの量の推移を配列にする
    let sumAskAmount = 0;
    const sumAskAmountHistory = [];
    for (const ask of sortNormalAsks) {
      sumAskAmount += ask.amount;
      sumAskAmountHistory.push(sumAskAmount);
    }

    // 階段状の累積受給曲線を歩調を合わせて登ることで均衡価格を発見
    let i = 0;
    let j = 0;
    const condition = true;
    while (condition) {
      if (sortNormalBids[i].price <= sortNormalAsks[j].price) {
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
      return;
    } else {
      // 止まったときの高い方の価格が均衡価格となる
      const equilibriumPrice = sortNormalBids[i].price <= sortNormalAsks[j].price ? sortNormalAsks[i].price : sortNormalBids[j].price;
      // 止まったときの低い方が成約取引量となる
      const equilibriumAmount = sortNormalBids[i].amount <= sortNormalAsks[j].amount ? sortNormalBids[i].amount : sortNormalAsks[j].amount;
      // 一日前の日付を取得
      const time = new Date();
      time.setDate(time.getDate() - 1);

      await single_price_normal_settlement.create(
        new SinglePriceNormalSettlement({
          price: equilibriumPrice,
          amount: equilibriumAmount,
          year: time.getFullYear(),
          month: time.getMonth(),
          date: time.getDate(),
        }),
      );
    }
  });
