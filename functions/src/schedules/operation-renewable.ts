/* eslint-disable camelcase */
import { admin_account } from '../admin-accounts';
import { renewable_ask_setting } from '../renewable-ask-settings';
import { renewable_ask } from '../renewable-asks';
import { proto, RenewableAsk, RenewableAskSetting } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.primaryRenewableAsk = f.pubsub
  .schedule('10 10 * * *') // .schedule('every 10 minutes')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const now = new Date();
    const setting = await renewable_ask_setting.getLatest();
    const type = proto.main.RenewableAskType.PRIMARY;
    const adminAccount = await admin_account.getByName('admin');
    const price = !setting.price_ujpy || now.getDate() == 1 ? '27500000' : setting.price_ujpy;
    // issue amount
    const amount = '50000000';
    await renewable_ask.create(
      new RenewableAsk({
        account_id: adminAccount[0].id,
        type: type,
        price_ujpy: price,
        amount_uspx: !setting.amount_uspx ? amount : setting.amount_uspx,
        is_deleted: false,
      }),
    );
    await renewable_ask_setting.create(
      new RenewableAskSetting({
        price_ujpy: (parseInt(price) + 100000).toString(),
        amount_uspx: !setting.amount_uspx ? amount : setting.amount_uspx,
      }),
    );
  });
