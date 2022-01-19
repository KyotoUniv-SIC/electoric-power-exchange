/* eslint-disable camelcase */
import { primary_ask } from '.';
import { balance_snapshot } from '../balance-snapshots';
import { monthly_usage } from '../monthly-usages';
import { PrimaryAsk } from '@local/common';

balance_snapshot.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const studentID = data.student_account_id;
  const now = new Date();
  const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  const usageAmount = !monthlyUsage.length ? 120 : monthlyUsage[0].amount_kwh;
  await primary_ask.create(
    new PrimaryAsk({
      account_id: studentID,
      price: 27,
      amount: usageAmount * 0.9,
    }),
  );

  // 全員分作るものはコメントアウト
  // const students = await student_account.list();

  // for (const student of students) {
  //   const studentID = student.id;
  //   const now = new Date();
  //   const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  //   const usageAmount = !monthlyUsage.length ? 120 : monthlyUsage[0].amount_kwh;
  //   await primary_ask.create(
  //     new PrimaryAsk({
  //       account_id: studentID,
  //       price: 27,
  //       amount: usageAmount * 0.9,
  //     }),
  //   );
  // }
});
