/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { primary_ask } from '.';
import { monthly_usage } from '../monthly-usages';
import { student_account } from '../student-accounts';
import { MonthlyUsage, PrimaryAsk } from '@local/common';

monthly_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as MonthlyUsage;
  const studentID = data.student_account_id;
  const studentAccount = await student_account.get(studentID);
  // 前年同月=>前月に参照するデータを変更
  // const now = new Date();
  // const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  // const usageAmount = !monthlyUsage.length ? 0 : monthlyUsage[0].amount_kwh_str;
  // const issueAmount = usageAmount < 120 ? 108 : usageAmount * 0.9;
  const issueAmount = data.amount_mwh;
  await primary_ask.create(
    new PrimaryAsk({
      account_id: studentID,
      price_ujpy: '27000000',
      amount_uupx: issueAmount,
    }),
  );

  if (!studentAccount.xrp_address) {
    console.log(studentAccount.id, 'no XRP address');
    return;
  }
});
