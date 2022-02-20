/* eslint-disable camelcase */
import { renewable_ask } from '.';
import { admin_account } from '../admin-accounts';
import { renewable_ask_setting } from '../renewable-ask-settings';
import { proto, RenewableAsk, RenewableAskSetting } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.primaryRenewableAsk = f.pubsub
  .schedule('0 12 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const setting = await renewable_ask_setting.getLatest();
    const type = proto.main.RenewableAskType.PRIMARY;
    const adminAccount = await admin_account.getByName('admin');
    await renewable_ask.create(
      new RenewableAsk({
        account_id: adminAccount[0].id,
        type: type,
        price: !setting.price ? 27.5 : setting.price,
        amount: !setting.amount ? 50 : setting.amount,
        is_deleted: false,
      }),
    );
    await renewable_ask_setting.create(
      new RenewableAskSetting({ price: !setting ? 27.6 : setting.price + 0.1, amount: !setting ? 50 : setting.amount }),
    );
  });
