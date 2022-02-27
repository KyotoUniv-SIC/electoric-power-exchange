/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { primary_ask } from '.';
import { monthly_usage } from '../monthly-usages';
import { student_account } from '../student-accounts';
import { PrimaryAsk } from '@local/common';

monthly_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const studentID = data.student_account_id;
  const studentAccount = await student_account.get(studentID);
  // 前年同月=>前月に参照するデータを変更
  // const now = new Date();
  // const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  // const usageAmount = !monthlyUsage.length ? 0 : monthlyUsage[0].amount_kwh;
  // const issueAmount = usageAmount < 120 ? 108 : usageAmount * 0.9;
  const issueAmount = data.amount_kwh;
  await primary_ask.create(
    new PrimaryAsk({
      account_id: studentID,
      price: 27,
      amount: issueAmount,
    }),
  );

  if (!studentAccount.xrp_address) {
    console.log(studentAccount.id, 'no XRP address');
    return;
  }
});
