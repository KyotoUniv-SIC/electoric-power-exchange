/* eslint-disable camelcase */
import { renewable_settlement } from '.';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_ask } from '../renewable-asks';
import { renewable_bid_history } from '../renewable-bid-histories';
import { renewable_bid } from '../renewable-bids';
import { single_price_renewable_settlement } from '../single-price-renewable-settlements';
import { proto, RenewableAskHistory, RenewableBidHistory, RenewableSettlement } from '@local/common';

single_price_renewable_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as RenewableSettlement;

  const renewableBids = await renewable_bid.listValid();
  const sortRenewableBids = renewableBids.sort((first, second) => parseInt(second.price_ujpy) - parseInt(first.price_ujpy));

  const renewableAsks = await renewable_ask.listValid();
  const sortRenewableAsks = renewableAsks.sort((first, second) => parseInt(first.price_ujpy) - parseInt(second.price_ujpy));

  let i = 0;
  let j = 0;
  const condition = true;
  while (condition) {
    if (
      parseInt(sortRenewableBids[i].price_ujpy) < parseInt(data.price_ujpy) ||
      parseInt(sortRenewableAsks[j].price_ujpy) > parseInt(data.price_ujpy)
    ) {
      for (; i < sortRenewableBids.length; i++) {
        await renewable_bid_history.create(
          new RenewableBidHistory(
            {
              account_id: sortRenewableBids[i].account_id,
              price_ujpy: sortRenewableBids[i].price_ujpy,
              amount_uspx: sortRenewableBids[i].amount_uspx,
              is_accepted: false,
              contract_price_ujpy: data.price_ujpy,
            },
            sortRenewableBids[i].created_at,
          ),
        );
        await renewable_bid.delete_(sortRenewableBids[i].id);
      }

      for (; j < sortRenewableAsks.length; j++) {
        await renewable_ask_history.create(
          new RenewableAskHistory(
            {
              type: sortRenewableAsks[j].type as unknown as proto.main.RenewableAskHistoryType,
              account_id: sortRenewableAsks[j].account_id,
              price_ujpy: sortRenewableAsks[j].price_ujpy,
              amount_uspx: sortRenewableAsks[j].amount_uspx,
              is_accepted: false,
              contract_price_ujpy: data.price_ujpy,
            },
            sortRenewableAsks[j].created_at,
          ),
        );
        await renewable_ask.delete_(sortRenewableAsks[j].id);
      }
      break;
    }

    if (parseInt(sortRenewableBids[i].amount_uspx) < parseInt(sortRenewableAsks[j].amount_uspx)) {
      await renewable_settlement.create(
        new RenewableSettlement({
          bid_id: sortRenewableBids[i].account_id,
          ask_id: sortRenewableAsks[j].account_id,
          price_ujpy: data.price_ujpy,
          amount_uspx: sortRenewableBids[i].amount_uspx,
        }),
      );

      await renewable_bid_history.create(
        new RenewableBidHistory(
          {
            account_id: sortRenewableBids[i].account_id,
            price_ujpy: sortRenewableBids[i].price_ujpy,
            amount_uspx: sortRenewableBids[i].amount_uspx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortRenewableBids[i].created_at,
        ),
      );
      await renewable_bid.delete_(sortRenewableBids[i].id);

      await renewable_ask_history.create(
        new RenewableAskHistory(
          {
            type: sortRenewableAsks[j].type as unknown as proto.main.RenewableAskHistoryType,
            account_id: sortRenewableAsks[j].account_id,
            price_ujpy: sortRenewableAsks[j].price_ujpy,
            amount_uspx: sortRenewableBids[i].amount_uspx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortRenewableAsks[j].created_at,
        ),
      );
      await renewable_ask.delete_(sortRenewableAsks[j].id);

      sortRenewableAsks[j].amount_uspx = (
        parseInt(sortRenewableAsks[j].amount_uspx) - parseInt(sortRenewableBids[i].amount_uspx)
      ).toString();
      i++;
      if (i >= sortRenewableBids.length) {
        break;
      }
    } else if (parseInt(sortRenewableBids[i].amount_uspx) > parseInt(sortRenewableAsks[j].amount_uspx)) {
      await renewable_settlement.create(
        new RenewableSettlement({
          bid_id: sortRenewableBids[i].account_id,
          ask_id: sortRenewableAsks[j].account_id,
          price_ujpy: data.price_ujpy,
          amount_uspx: sortRenewableAsks[j].amount_uspx,
        }),
      );

      await renewable_bid_history.create(
        new RenewableBidHistory(
          {
            account_id: sortRenewableBids[i].account_id,
            price_ujpy: sortRenewableBids[i].price_ujpy,
            amount_uspx: sortRenewableAsks[j].amount_uspx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortRenewableBids[i].created_at,
        ),
      );
      await renewable_bid.delete_(sortRenewableBids[i].id);

      await renewable_ask_history.create(
        new RenewableAskHistory(
          {
            type: sortRenewableAsks[j].type as unknown as proto.main.RenewableAskHistoryType,
            account_id: sortRenewableAsks[j].account_id,
            price_ujpy: sortRenewableAsks[j].price_ujpy,
            amount_uspx: sortRenewableAsks[j].amount_uspx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortRenewableAsks[j].created_at,
        ),
      );
      await renewable_ask.delete_(sortRenewableAsks[j].id);

      sortRenewableBids[i].amount_uspx = (
        parseInt(sortRenewableBids[i].amount_uspx) - parseInt(sortRenewableAsks[j].amount_uspx)
      ).toString();
      j++;
      if (j >= sortRenewableAsks.length) {
        break;
      }
    } else {
      await renewable_settlement.create(
        new RenewableSettlement({
          bid_id: sortRenewableBids[i].account_id,
          ask_id: sortRenewableAsks[j].account_id,
          price_ujpy: data.price_ujpy,
          amount_uspx: sortRenewableBids[i].amount_uspx,
        }),
      );

      await renewable_bid_history.create(
        new RenewableBidHistory(
          {
            account_id: sortRenewableBids[i].account_id,
            price_ujpy: sortRenewableBids[i].price_ujpy,
            amount_uspx: sortRenewableBids[i].amount_uspx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortRenewableBids[i].created_at,
        ),
      );

      await renewable_bid.delete_(sortRenewableBids[i].id);

      await renewable_ask_history.create(
        new RenewableAskHistory(
          {
            type: sortRenewableAsks[j].type as unknown as proto.main.RenewableAskHistoryType,
            account_id: sortRenewableAsks[j].account_id,
            price_ujpy: sortRenewableAsks[j].price_ujpy,
            amount_uspx: sortRenewableBids[i].amount_uspx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortRenewableAsks[j].created_at,
        ),
      );
      await renewable_ask.delete_(sortRenewableAsks[j].id);

      i++;
      j++;
      if (i >= sortRenewableBids.length || j >= sortRenewableAsks.length) {
        break;
      }
    }
  }
  console.log('complete Renewable settlement');
});
