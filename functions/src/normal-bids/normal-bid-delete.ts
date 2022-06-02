/* eslint-disable camelcase */
import { normal_bid } from '.';
import { normal_bid_delete } from '../normal-bid-deletes';
import { NormalBidDelete } from '@local/common';

normal_bid_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as NormalBidDelete;
  const bid = await normal_bid.get(data.bid_id);

  await normal_bid.update({ id: bid.id, is_deleted: true });
});
