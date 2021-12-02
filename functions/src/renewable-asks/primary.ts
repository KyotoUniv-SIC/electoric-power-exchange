/* eslint-disable camelcase */
import { renewable_ask } from '.';
import { proto, RenewableAsk } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const type = proto.main.RenewableAskType.PRIMARY;
    const price = 27.5;
    const amount = 50;
    await renewable_ask.create(
      new RenewableAsk({
        type: type,
        price: price,
        amount: amount,
      }),
    );
  });
