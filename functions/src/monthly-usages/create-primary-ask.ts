/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { monthly_usage } from '.';
import { primary_ask } from '../primary-asks';
import { MonthlyUsage, PrimaryAsk } from '@local/common';

monthly_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as MonthlyUsage;
  const studentID = data.student_account_id;
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
});
