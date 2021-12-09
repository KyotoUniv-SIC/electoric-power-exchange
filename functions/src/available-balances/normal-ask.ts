/* eslint-disable camelcase */
import { available_balance } from '.';
import { normal_ask } from '../normal-asks';
import { AvailableBalance } from '@local/common';

normal_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const availableBalance = await available_balance.getLatest(data.account_id);

  await available_balance.update(
    new AvailableBalance(
      {
        student_account_id: availableBalance[0].student_account_id,
        amount_upx: availableBalance[0].amount_upx - data.amount,
        amount_spx: availableBalance[0].amount_spx,
      },
      data.created_at,
      data.updated_at,
    ),
  );
});
