/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { monthly_usage } from '.';
import { daily_usage } from '../daily-usages';
import { primary_ask } from '../primary-asks';
import { student_account } from '../student-accounts';
import { MonthlyUsage, PrimaryAsk } from '@local/common';
import { Timestamp } from 'firebase/firestore';

monthly_usage.onCreateHandler.push(async (snapshot, context) => {
  // 前年同月=>前月に参照するデータを変更
  // const now = new Date();
  // const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  // const usageAmount = !monthlyUsage.length ? 0 : monthlyUsage[0].amount_kwh_str;
  // const issueAmount = usageAmount < 120 ? 108 : usageAmount * 0.9;

  const data = snapshot.data()! as MonthlyUsage;
  const studentID = data.student_account_id;
  const student = await student_account.get(studentID);
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  if ((student.created_at as Timestamp).toDate() > lastMonth) {
    const usages = await daily_usage.listLastMonth(student.room_id);
    const uupxAmount = usages.reduce((previous, current) => previous + parseInt(current.amount_kwh_str), 0) * 1000000;
    if (!uupxAmount) {
      console.log(student.room_id, 'have no usage data');
    }
    await primary_ask.create(new PrimaryAsk({ account_id: studentID, price_ujpy: '27000000', amount_uupx: uupxAmount.toString() }));
  } else {
    const issueAmount = data.amount_mwh;
    await primary_ask.create(new PrimaryAsk({ account_id: studentID, price_ujpy: '27000000', amount_uupx: issueAmount }));
  }
});
