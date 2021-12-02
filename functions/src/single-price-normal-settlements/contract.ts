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
    const sortNormalBids = normalBids.sort((first, second) => second.price - first.price);

    // Askを価格の低い順に並び替える
    const normalAsks = await normal_ask.list();
    const sortNormalAsks = normalAsks.sort((first, second) => first.price - second.price);

    let i = 0;
    let j = 0;
    let match = [];

    // 価格の均衡点を探して、matchに記録
    while (i < sortNormalBids.length && j < sortNormalAsks.length) {
      if (sortNormalBids[i].price <= sortNormalAsks[j].price) {
        j = j + 1;
      } else {
        i = i + 1;
        match = [i, j];
      }
    }

    if (!match.length) {
      const price = sortNormalBids[match[0]].price;
      const acceptBidsAmount = sortNormalBids.slice(match[0]).reduce((sum, next) => sum + next.amount, 0);
      const acceptAsksAmount = sortNormalAsks.slice(match[1]).reduce((sum, next) => sum + next.amount, 0);
      const amount = acceptBidsAmount < acceptAsksAmount ? acceptBidsAmount : acceptAsksAmount;
      const time = new Date();
      time.setDate(time.getDate() - 1);

      await single_price_normal_settlement.create(
        new SinglePriceNormalSettlement({
          price: price,
          amount: amount,
          year: time.getFullYear(),
          month: time.getMonth(),
          date: time.getDate(),
        }),
      );
    }
  });
