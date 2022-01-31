/* eslint-disable camelcase */
import { balance } from '.';
import { student_account } from '../student-accounts';
import { Balance } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  // アカウント作成時、試験的に50トークンずつ付与する仕様に（精算には含めていない）
  await balance.create(new Balance({ student_account_id: data.id, amount_upx: 50, amount_spx: 50 }, data.created_at, data.updated_at));
});
