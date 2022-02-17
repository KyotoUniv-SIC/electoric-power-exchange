/* eslint-disable camelcase */
import { daily_usage } from '.';
import { DailyUsage } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.primaryRenewableAsk = f.pubsub
  .schedule('0 12 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    await daily_usage.create(new DailyUsage({ room_id: 'higashi101', amount_kwh_str: '10' }));
    await daily_usage.create(new DailyUsage({ room_id: 'higashi102', amount_kwh_str: '20' }));
    await daily_usage.create(new DailyUsage({ room_id: 'higashi103', amount_kwh_str: '30' }));
  });
