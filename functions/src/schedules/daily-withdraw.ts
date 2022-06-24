/* eslint-disable camelcase */
import { balance } from '../balances';
import { daily_payment } from '../daily-payments';
import { daily_usage } from '../daily-usages';
import { student_account } from '../student-accounts';
import { DailyPayment } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, memory: '2GB' });
module.exports.dailyWithdraw = f.pubsub
  // .schedule('30 9 * * *') //
  .schedule('15,45 * * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const dailyUsages = await daily_usage.listYesterday();

    for (const dailyUsage of dailyUsages) {
      const usage = parseInt(dailyUsage.amount_kwh_str) * 1000000;
      const students = await student_account.getByRoomID(dailyUsage.room_id);
      if (usage <= 0) {
        console.log('0 or minus usage detected');
      } else if (!students.length) {
        console.log(dailyUsage.room_id, 'no student');
      } else {
        console.log('create DailyPayment', dailyUsage.room_id);
        for (const student of students) {
          const accountBalance = await balance.listLatest(student.id);
          const uupxAmount = parseInt(accountBalance[0].amount_uupx);
          const uspxAmount = parseInt(accountBalance[0].amount_uspx);
          const totalBalance = uupxAmount + uspxAmount;

          // uspxが大きい場合は全額ここから支払い、それ以外はuspxをすべて支払い
          let uupxPayment: string;
          let uspxPayment: string;
          let insufficiency: string;

          if (usage < uspxAmount) {
            uspxPayment = usage.toString();
            uupxPayment = '0';
            insufficiency = '0';
          } else if (usage < totalBalance) {
            uspxPayment = uspxAmount.toString();
            uupxPayment = (usage - uspxAmount).toString();
            insufficiency = '0';
          } else {
            uupxPayment = uupxAmount.toString();
            uspxPayment = uspxAmount.toString();
            insufficiency = (usage - totalBalance).toString();
          }

          const now = new Date();

          await daily_payment.create(
            new DailyPayment({
              student_account_id: student.id,
              year: now.getFullYear().toString(),
              month: (now.getMonth() + 1).toString(),
              date: now.getDate().toString(),
              amount_mwh: usage.toString(),
              amount_uupx: uupxPayment,
              amount_uspx: uspxPayment,
              amount_insufficiency: insufficiency,
            }),
          );
        }
      }
    }
  });
