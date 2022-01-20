/* eslint-disable camelcase */
import { balance } from '.';
import { primary_ask } from '../primary-asks';

primary_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const accountBalance = await balance.getLatest(data.account_id);
  if (!accountBalance.length) {
    return;
  }
  await balance.update({
    id: accountBalance[0].id,
    student_account_id: data.account_id,
    amount_upx: data.amount,
    amount_spx: 0,
  });
});
