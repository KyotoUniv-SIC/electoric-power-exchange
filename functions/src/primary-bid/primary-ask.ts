// eslint-disable-next-line camelcase
import { primary_bid } from '.';
// eslint-disable-next-line camelcase
import { primary_ask } from '../primary-asks';
import { PrimaryBid } from '@local/common';

primary_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  await primary_bid.create(new PrimaryBid(data, data.created_at, data.updated_at));
});
