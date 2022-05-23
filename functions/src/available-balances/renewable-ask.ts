/* eslint-disable camelcase */
import { available_balance } from '.';
import { renewable_ask } from '../renewable-asks';
import { proto } from '@local/common';

renewable_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as proto.main.RenewableAsk;
  const availableBalance = await available_balance.getLatest(data.account_id);

  if (data.type == proto.main.RenewableAskType.SECONDARY) {
    await available_balance.update({
      id: availableBalance[0].id,
      student_account_id: availableBalance[0].student_account_id,
      amount_uspx: (parseInt(availableBalance[0].amount_uspx) - parseInt(data.amount_uspx)).toString(),
    });
  }
});
