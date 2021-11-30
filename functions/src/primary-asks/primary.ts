// eslint-disable-next-line camelcase
import { primary_ask } from '.';
// eslint-disable-next-line camelcase
import { monthly_usage } from '../monthly-usages';
// eslint-disable-next-line camelcase
import { student_account } from '../student-accounts';
import { PrimaryAsk } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 0 * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();

    for (const student of students) {
      const studentID = student.id;
      // problem: StudentID指定で取れるようにする
      const monthlyUsage = await monthly_usage.get(studentID);
      const usageAmount = !monthlyUsage ? 120 : monthlyUsage.amount_kwh;
      await primary_ask.create(
        new PrimaryAsk({
          account_id: studentID,
          price: 27,
          amount: usageAmount,
        }),
      );
    }
  });
