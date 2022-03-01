/* eslint-disable camelcase */
import { balance } from '.';
import { student_account } from '../student-accounts';
import { Balance } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  await balance.create(new Balance({ student_account_id: data.id, amount_upx: 0, amount_spx: 0 }, data.created_at, data.updated_at));
});
