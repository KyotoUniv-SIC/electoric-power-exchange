/* eslint-disable camelcase */
import { daily_usage } from '.';
import { DailyUsage } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.primaryRenewableAsk = f.pubsub
  .schedule('30 9 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    await daily_usage.create(new DailyUsage({ room_id: 'higashi999', amount_kwh_str: '5' }));
  });
