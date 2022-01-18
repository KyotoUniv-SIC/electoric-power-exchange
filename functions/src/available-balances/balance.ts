/* eslint-disable camelcase */
import { available_balance } from '.';
import { balance } from '../balances';
import { AvailableBalance } from '@local/common';

balance.onUpdateHandler.push(async (snapshot, context) => {
  const data = snapshot.after.data()!;
  const availableBalance = await available_balance.getLatest(data.student_account_id);

  await available_balance.update(
    new AvailableBalance({ id: availableBalance[0].id, amount_upx: data.amount_upx, amount_spx: data.amount_spx }),
  );
});

balance.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  await available_balance.create(new AvailableBalance(data));
});
