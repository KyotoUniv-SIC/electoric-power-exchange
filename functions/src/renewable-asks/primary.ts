/* eslint-disable camelcase */
import { renewable_ask } from '.';
import { admin_account } from '../admin-accounts';
import { proto, RenewableAsk } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const type = proto.main.RenewableAskType.PRIMARY;
    const admin = await admin_account.list();
    const price = 27.5;
    const amount = 50;
    await renewable_ask.create(
      new RenewableAsk({
        type: type,
        account_id: admin[0].id,
        price: price,
        amount: amount,
      }),
    );
  });
