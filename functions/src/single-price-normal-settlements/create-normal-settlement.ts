/* eslint-disable camelcase */
import { single_price_normal_settlement } from '.';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_ask } from '../normal-asks';
import { normal_bid_history } from '../normal-bid-histories';
import { normal_bid } from '../normal-bids';
import { normal_settlement } from '../normal-settlements';
import { NormalAskHistory, NormalBidHistory, NormalSettlement, proto, SinglePriceNormalSettlement } from '@local/common';

single_price_normal_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as SinglePriceNormalSettlement;

  const normalBids = await normal_bid.listValid();
  const sortNormalBids = normalBids.sort((first, second) => parseInt(second.price_ujpy) - parseInt(first.price_ujpy));

  const normalAsks = await normal_ask.listValid();
  const sortNormalAsks = normalAsks.sort((first, second) => parseInt(first.price_ujpy) - parseInt(second.price_ujpy));

  let i = 0;
  let j = 0;
  const condition = true;
  while (condition) {
    if (
      parseInt(sortNormalBids[i].price_ujpy) < parseInt(data.price_ujpy) ||
      parseInt(sortNormalAsks[j].price_ujpy) > parseInt(data.price_ujpy)
    ) {
      for (; i < sortNormalBids.length; i++) {
        await normal_bid_history.create(
          new NormalBidHistory(
            {
              account_id: sortNormalBids[i].account_id,
              price_ujpy: sortNormalBids[i].price_ujpy,
              amount_uupx: sortNormalBids[i].amount_uupx,
              is_accepted: false,
              contract_price_ujpy: data.price_ujpy,
            },
            sortNormalBids[i].created_at,
          ),
        );
        await normal_bid.delete_(sortNormalBids[i].id);
      }

      for (; j < sortNormalAsks.length; j++) {
        await normal_ask_history.create(
          new NormalAskHistory(
            {
              type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
              account_id: sortNormalAsks[j].account_id,
              price_ujpy: sortNormalAsks[j].price_ujpy,
              amount_uupx: sortNormalAsks[j].amount_uupx,
              is_accepted: false,
              contract_price_ujpy: data.price_ujpy,
            },
            sortNormalAsks[j].created_at,
          ),
        );
        await normal_ask.delete_(sortNormalAsks[j].id);
      }
      break;
    }

    if (parseInt(sortNormalBids[i].amount_uupx) < parseInt(sortNormalAsks[j].amount_uupx)) {
      await normal_settlement.create(
        new NormalSettlement({
          bid_id: sortNormalBids[i].account_id,
          ask_id: sortNormalAsks[j].account_id,
          price_ujpy: data.price_ujpy,
          amount_uupx: sortNormalBids[i].amount_uupx,
        }),
      );

      await normal_bid_history.create(
        new NormalBidHistory(
          {
            account_id: sortNormalBids[i].account_id,
            price_ujpy: sortNormalBids[i].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortNormalBids[i].created_at,
        ),
      );
      await normal_bid.delete_(sortNormalBids[i].id);

      await normal_ask_history.create(
        new NormalAskHistory(
          {
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price_ujpy: sortNormalAsks[j].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortNormalAsks[j].created_at,
        ),
      );
      await normal_ask.delete_(sortNormalAsks[j].id);

      sortNormalAsks[j].amount_uupx = (parseInt(sortNormalAsks[j].amount_uupx) - parseInt(sortNormalBids[i].amount_uupx)).toString();
      i++;
      if (i >= sortNormalBids.length) {
        break;
      }
    } else if (parseInt(sortNormalBids[i].amount_uupx) > parseInt(sortNormalAsks[j].amount_uupx)) {
      await normal_settlement.create(
        new NormalSettlement({
          bid_id: sortNormalBids[i].account_id,
          ask_id: sortNormalAsks[j].account_id,
          price_ujpy: data.price_ujpy,
          amount_uupx: sortNormalAsks[j].amount_uupx,
        }),
      );

      await normal_bid_history.create(
        new NormalBidHistory(
          {
            account_id: sortNormalBids[i].account_id,
            price_ujpy: sortNormalBids[i].price_ujpy,
            amount_uupx: sortNormalAsks[j].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortNormalBids[i].created_at,
        ),
      );
      await normal_bid.delete_(sortNormalBids[i].id);

      await normal_ask_history.create(
        new NormalAskHistory(
          {
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price_ujpy: sortNormalAsks[j].price_ujpy,
            amount_uupx: sortNormalAsks[j].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortNormalAsks[j].created_at,
        ),
      );
      await normal_ask.delete_(sortNormalAsks[j].id);

      sortNormalBids[i].amount_uupx = (parseInt(sortNormalBids[i].amount_uupx) - parseInt(sortNormalAsks[j].amount_uupx)).toString();
      j++;
      if (j >= sortNormalAsks.length) {
        break;
      }
    } else {
      await normal_settlement.create(
        new NormalSettlement({
          bid_id: sortNormalBids[i].account_id,
          ask_id: sortNormalAsks[j].account_id,
          price_ujpy: data.price_ujpy,
          amount_uupx: sortNormalBids[i].amount_uupx,
        }),
      );

      await normal_bid_history.create(
        new NormalBidHistory(
          {
            account_id: sortNormalBids[i].account_id,
            price_ujpy: sortNormalBids[i].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortNormalBids[i].created_at,
        ),
      );

      await normal_bid.delete_(sortNormalBids[i].id);

      await normal_ask_history.create(
        new NormalAskHistory(
          {
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price_ujpy: sortNormalAsks[j].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          },
          sortNormalAsks[j].created_at,
        ),
      );
      await normal_ask.delete_(sortNormalAsks[j].id);

      i++;
      j++;
      if (i >= sortNormalBids.length || j >= sortNormalAsks.length) {
        break;
      }
    }
  }
  console.log('complete Normal settlement');
});
