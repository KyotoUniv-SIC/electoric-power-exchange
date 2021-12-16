/* eslint-disable camelcase */
import { balance_snapshot } from '.';
import { balance } from '../balances';
import { market_status } from '../market-statuses';
import { student_account } from '../student-accounts';
import { BalanceSnapshot } from '@local/common';
import { Timestamp } from 'firebase/firestore';

market_status.onUpdateHandler.push(async (snapshot, context) => {
  const data = snapshot.after.data()!;

  if ((data.created_at as Timestamp).toDate().getDate() == 1 && data.is_finished_normal == true && data.is_finished_renewable == true) {
    const students = await student_account.list();
    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLastMonth(studentID);
      await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
    }
  } else {
    return;
  }
});
