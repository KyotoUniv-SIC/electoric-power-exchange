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
    const now = new Date();
    const setting = await renewable_ask_setting.getLatest();
    const type = proto.main.RenewableAskType.PRIMARY;
    const adminAccount = await admin_account.getByName('admin');
    await renewable_ask.create(
      new RenewableAsk({
        account_id: adminAccount[0].id,
        type: type,
        price_ujpy: !setting.price_ujpy || now.getDate() == 1 ? '27500000' : setting.price_ujpy,
        amount_uspx: !setting.amount_uspx ? '50000000' : setting.amount_uspx,
        is_deleted: false,
      }),
    );
    await renewable_ask_setting.create(
      new RenewableAskSetting({
        price_ujpy: !setting.price_ujpy || now.getDate() == 1 ? '27600000' : (parseInt(setting.price_ujpy) + 100000).toString(),
        amount_uspx: !setting.amount_uspx ? '50000000' : setting.amount_uspx,
      }),
    );
  });
