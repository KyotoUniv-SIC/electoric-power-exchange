/* eslint-disable camelcase */
import { normal_settlement } from '.';
import { normal_ask } from '../normal-asks';
import { normal_bid } from '../normal-bids';
import { single_price_normal_settlement } from '../single-price-normal-settlements';
import { NormalSettlement } from '@local/common';

single_price_normal_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  const normalBids = await normal_bid.list();
  const sortNormalBids = normalBids.sort((first, second) => second.price - first.price);

  const normalAsks = await normal_ask.list();
  const sortNormalAsks = normalAsks.sort((first, second) => first.price - second.price);

  let i = 0;
  let j = 0;
  const condition = true;
  while (condition) {
    if (sortNormalBids[i] < data.price || sortNormalAsks[j] > data.price) {
      break;
    }
    if (sortNormalBids[i].amount < sortNormalAsks[j].amount) {
      await normal_settlement.create(
        new NormalSettlement({
          bid_id: sortNormalBids[i].account_id,
          ask_id: sortNormalAsks[j].account_id,
          price: data.price,
          amount: sortNormalBids[i].amount,
          year: data.year,
          month: data.month,
          date: data.date,
        }),
      );
      sortNormalAsks[j].amount -= sortNormalBids[i].amount;
      i++;
    } else if (sortNormalBids[i].amount > sortNormalAsks[j].amount) {
      await normal_settlement.create(
        new NormalSettlement({
          bid_id: sortNormalBids[i].account_id,
          ask_id: sortNormalAsks[j].account_id,
          price: data.price,
          amount: sortNormalAsks[j].amount,
          year: data.year,
          month: data.month,
          date: data.date,
        }),
      );
      sortNormalBids[i].amount -= sortNormalAsks[j].amount;
      j++;
    } else {
      await normal_settlement.create(
        new NormalSettlement({
          bid_id: sortNormalBids[i].account_id,
          ask_id: sortNormalAsks[j].account_id,
          price: data.price,
          amount: sortNormalBids[i].amount,
          year: data.year,
          month: data.month,
          date: data.date,
        }),
      );
      i++;
      j++;
    }
  }
});
