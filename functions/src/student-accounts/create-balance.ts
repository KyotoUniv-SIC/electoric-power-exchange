/* eslint-disable camelcase */
import { student_account } from '.';
import { balance } from '../balances';
import { Balance, StudentAccount } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as StudentAccount;
  await balance.create(new Balance({ student_account_id: data.id, amount_uupx: '0', amount_uspx: '0' }, data.created_at, data.updated_at));
});
