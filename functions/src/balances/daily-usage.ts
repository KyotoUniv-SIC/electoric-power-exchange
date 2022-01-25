/* eslint-disable camelcase */
import { balance } from '.';
import { daily_usage } from '../daily-usages';
import { student_account } from '../student-accounts';

daily_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const studentAccount = await student_account.getByRoomID(data.room_id);
  if (!studentAccount.length) {
    return;
  }
  const accountBalance = await balance.getLatest(studentAccount[0].id);

  if (data.amount_kwh < accountBalance[0].amount_spx) {
    await balance.update({
      id: accountBalance[0].id,
      student_account_id: accountBalance[0].student_account_id,
      // amount_upx: accountBalance[0].amount_upx,
      amount_spx: accountBalance[0].amount_spx - data.amount_kwh,
    });
  } else {
    const spxShortage = data.amount_kwh - accountBalance[0].amount_spx;
    await balance.update({
      id: accountBalance[0].id,
      student_account_id: accountBalance[0].student_account_id,
      amount_upx: accountBalance[0].amount_upx - spxShortage,
      amount_spx: 0,
    });
  }
});
