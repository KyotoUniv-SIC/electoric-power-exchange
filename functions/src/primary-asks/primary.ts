// eslint-disable-next-line camelcase
import { primary_ask } from '.';
// eslint-disable-next-line camelcase
import { monthly_usage } from '../monthly-usages';
// eslint-disable-next-line camelcase
import { student_account } from '../student-accounts';
import { PrimaryAsk } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 1 * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();

    for (const student of students) {
      const studentID = student.id;
      const now = new Date();
      const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
      const usageAmount = !monthlyUsage[0] ? 120 : monthlyUsage[0].amount_kwh;
      await primary_ask.create(
        new PrimaryAsk({
          account_id: studentID,
          price: 27,
          amount: usageAmount,
        }),
      );
    }
  });
