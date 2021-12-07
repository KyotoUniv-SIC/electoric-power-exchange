/* eslint-disable camelcase */
import { remaining_balance } from '.';
import { balance } from '../balances';
import { student_account } from '../student-accounts';
import { RemainingBalance } from '@local/common';
import * as functions from 'firebase-functions';

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 0 1 * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();

    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLastMonth(studentID);
      await remaining_balance.create(new RemainingBalance(lastMonthBalance[0]));
    }
  });
