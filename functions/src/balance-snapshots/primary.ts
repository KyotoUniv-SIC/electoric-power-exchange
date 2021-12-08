/* eslint-disable camelcase */
import { balance_snapshot } from '.';
import { balance } from '../balances';
import { student_account } from '../student-accounts';
import { BalanceSnapshot } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 1 * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();

    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLastMonth(studentID);
      await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
    }
  });
