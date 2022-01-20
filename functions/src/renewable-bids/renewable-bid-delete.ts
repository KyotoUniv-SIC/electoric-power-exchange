/* eslint-disable camelcase */
import { renewable_bid } from '.';
import { renewable_bid_delete } from '../renewable-bid-deletes';

renewable_bid_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const bid = await renewable_bid.get(data.bid_id);

  await renewable_bid.update({ id: bid.id, is_deleted: true });
});
