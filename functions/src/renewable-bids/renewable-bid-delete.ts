/* eslint-disable camelcase */
import { renewable_bid } from '.';
import { renewable_bid_delete } from '../renewable-bid-deletes';
import { RenewableBid } from '@local/common';

renewable_bid_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const bid = await renewable_bid.get(data.bid_id);

  await renewable_bid.update(
    new RenewableBid(
      { id: bid.id, account_id: bid.account_id, price: bid.price, amount: bid.amount, is_deleted: true },
      data.created_at,
      data.updated_at,
    ),
  );
});
