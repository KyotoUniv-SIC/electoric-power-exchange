/* eslint-disable camelcase */
import { renewable_settlement } from '.';
import { renewable_ask } from '../renewable-asks';
import { renewable_bid } from '../renewable-bids';
import { single_price_renewable_settlement } from '../single-price-renewable-settlements';
import { RenewableSettlement } from '@local/common';

single_price_renewable_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  const renewableBids = await renewable_bid.list();
  const sortRenewableBids = renewableBids.sort((first, second) => second.price - first.price);

  const renewableAsks = await renewable_ask.list();
  const sortRenewableAsks = renewableAsks.sort((first, second) => first.price - second.price);

  let i = 0;
  let j = 0;
  const condition = true;
  while (condition) {
    if (sortRenewableBids[i] < data.price || sortRenewableAsks[j] > data.price) {
      break;
    }
    if (sortRenewableBids[i].amount < sortRenewableAsks[j].amount) {
      await renewable_settlement.create(
        new RenewableSettlement({
          bid_id: sortRenewableBids[i].account_id,
          ask_id: sortRenewableAsks[j].account_id,
          price: data.price,
          amount: sortRenewableBids[i].amount,
        }),
      );
      sortRenewableAsks[j].amount -= sortRenewableBids[i].amount;
      i++;
    } else if (sortRenewableBids[i].amount > sortRenewableAsks[j].amount) {
      await renewable_settlement.create(
        new RenewableSettlement({
          bid_id: sortRenewableBids[i].account_id,
          ask_id: sortRenewableAsks[j].account_id,
          price: data.price,
          amount: sortRenewableAsks[j].amount,
        }),
      );
      sortRenewableBids[i].amount -= sortRenewableAsks[j].amount;
      j++;
    } else {
      await renewable_settlement.create(
        new RenewableSettlement({
          bid_id: sortRenewableBids[i].account_id,
          ask_id: sortRenewableAsks[j].account_id,
          price: data.price,
          amount: sortRenewableBids[i].amount,
        }),
      );
      i++;
      j++;
    }
  }
});
