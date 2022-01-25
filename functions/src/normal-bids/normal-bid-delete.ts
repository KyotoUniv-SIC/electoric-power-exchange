/* eslint-disable camelcase */
import { normal_bid } from '.';
import { normal_bid_delete } from '../normal-bid-deletes';

normal_bid_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const bid = await normal_bid.get(data.bid_id);

  await normal_bid.update({ id: bid.id, is_deleted: true });
});
