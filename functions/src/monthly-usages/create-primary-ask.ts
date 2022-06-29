/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
// import { monthly_usage } from '.';
import { daily_usage } from '../daily-usages';
import { primary_ask } from '../primary-asks';
import { primaryAskOnCreate } from '../primary-asks/create-balance';
import { student_account } from '../student-accounts';
import { MonthlyUsage, PrimaryAsk } from '@local/common';
import { Timestamp } from 'firebase/firestore';

// monthly_usage.onCreateHandler.push();
export const monthlyUsageOnCreate = async (snapshot: any, context: any) => {
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
    // 一ヶ月以内に作成されたアカウントの場合
    const usages = await daily_usage.listLastMonth(student.room_id);
    const uupxAmount = usages.reduce((previous, current) => previous + parseInt(current.amount_kwh_str), 0) * 1000000;
    if (!uupxAmount) {
      console.log(student.room_id, 'have no usage data');
    }
    const primaryAsk = new PrimaryAsk({ account_id: studentID, price_ujpy: '27000000', amount_uupx: uupxAmount.toString() });
    await primary_ask.create(primaryAsk);
    await primaryAskOnCreate({ data: () => primaryAsk }, null);
  } else {
    // 一ヶ月以内に作成されたアカウントでない場合
    const issueAmount = data.amount_mwh;
    const primaryAsk = new PrimaryAsk({ account_id: studentID, price_ujpy: '27000000', amount_uupx: issueAmount });
    await primary_ask.create(primaryAsk);
    await primaryAskOnCreate({ data: () => primaryAsk }, null);
  }
};
