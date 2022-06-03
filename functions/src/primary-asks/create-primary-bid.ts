/* eslint-disable camelcase */
import { primary_ask } from '.';
import { primary_bid } from '../primary-bids';
import { PrimaryAsk, PrimaryBid } from '@local/common';

primary_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as PrimaryAsk;

  await primary_bid.create(new PrimaryBid(data, data.created_at, data.updated_at));
});
