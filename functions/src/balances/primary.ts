/* eslint-disable camelcase */
import { balance } from '.';
import { primary_ask } from '../primary-asks';
import { Balance } from '@local/common';

primary_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  await balance.create(
    new Balance({
      student_account_id: data.account_id,
      amount_upx: data.amount,
      amount_spx: 0,
    }),
  );
});
