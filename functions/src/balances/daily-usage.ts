/* eslint-disable camelcase */
import { balance } from '.';
import { daily_usage } from '../daily-usages';
import { Balance } from '@local/common';

daily_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const accountBalance = await balance.getLatest(data.student_account_id);
  if (!accountBalance.length) {
    return;
  }
  if (data.amount_kwh < accountBalance[0].amount_spx) {
    await balance.update(
      new Balance({
        id: accountBalance[0].id,
        student_account_id: data.student_account_id,
        amount_upx: accountBalance[0].amount_upx,
        amount_spx: accountBalance[0].amount_spx - data.amount_kwh,
      }),
    );
  } else {
    const spxShortage = data.amount_kwh - accountBalance[0].amount_spx;
    await balance.update(
      new Balance({
        id: accountBalance[0].id,
        student_account_id: data.student_account_id,
        amount_upx: accountBalance[0].amount_upx - spxShortage,
        amount_spx: 0,
      }),
    );
  }
});
