/* eslint-disable camelcase */
import { available_balance } from '.';
import { renewable_ask } from '../renewable-asks';
import { AvailableBalance, proto } from '@local/common';

renewable_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const availableBalance = await available_balance.getLatest(data.account_id);

  if (data.type == proto.main.RenewableAskType.SECONDARY) {
    await available_balance.update(
      new AvailableBalance({
        id: availableBalance[0].id,
        student_account_id: availableBalance[0].student_account_id,
        amount_upx: availableBalance[0].amount_upx,
        amount_spx: availableBalance[0].amount_spx - data.amount,
      }),
    );
  }
});
