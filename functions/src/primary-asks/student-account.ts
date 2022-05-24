/* eslint-disable camelcase */
import { primary_ask } from '.';
import { student_account } from '../student-accounts';
import { PrimaryAsk, StudentAccount } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as StudentAccount;
  await primary_ask.create(new PrimaryAsk({ account_id: data.id, price_ujpy: '27000000', amount_uupx: '100000000' }));
});
