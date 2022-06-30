/* eslint-disable camelcase */
import { admin_account } from '../admin-accounts';
import { daily_payment } from '../daily-payments';
import { daily_usage } from '../daily-usages';
import { renewable_ask_setting } from '../renewable-ask-settings';
import { renewable_ask } from '../renewable-asks';
import { student_account } from '../student-accounts';
import { proto, RenewableAsk, RenewableAskSetting } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, memory: '2GB' });
module.exports.operationRenewable = f.pubsub
  .schedule('15 10 * * *')
  // .schedule('5,35 * * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const now = new Date();
    const setting = await renewable_ask_setting.getLatest();
    const type = proto.main.RenewableAskType.PRIMARY;
    const adminAccount = await admin_account.getByName('admin');
    const price = !setting.price_ujpy || now.getDate() == 1 ? '27500000' : setting.price_ujpy;

    const dailyUsages = await daily_usage.listYesterday();
    const dailyUsageAmount = dailyUsages.reduce((previous, current) => previous + parseInt(current.amount_kwh_str), 0) * 1000000;
    const students = await student_account.list();
    let paymentAmount = 0;
    for (const student of students) {
      const dailyPayments = await daily_payment.listToday(student.id);
      paymentAmount += dailyPayments.reduce((previous, current) => previous + parseInt(current.amount_mwh), 0);
    }
    console.log('Payment Amount', paymentAmount);
    console.log('Daily Usage Amount', dailyUsageAmount);

    const amount = !setting.amount_uspx
      ? Math.floor((25000000 * paymentAmount) / dailyUsageAmount).toString()
      : Math.floor((parseInt(setting.amount_uspx) * paymentAmount) / dailyUsageAmount).toString();

    console.log('Isuue Amount', amount);

    if (parseInt(amount) > 0) {
      await renewable_ask.create(
        new RenewableAsk({
          account_id: adminAccount[0].id,
          type: type,
          price_ujpy: price,
          amount_uspx: amount,
          is_deleted: false,
        }),
      );
    }

    await renewable_ask_setting.create(
      new RenewableAskSetting({
        price_ujpy: (parseInt(price) + 100000).toString(),
        amount_uspx: !setting.amount_uspx ? amount : setting.amount_uspx,
      }),
    );
  });
