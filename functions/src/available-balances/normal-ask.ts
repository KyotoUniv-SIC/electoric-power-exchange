/* eslint-disable camelcase */
import { available_balance } from '.';
import { normal_ask } from '../normal-asks';
import { NormalAsk, proto } from '@local/common';

normal_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as NormalAsk;

  const availableBalance = await available_balance.getLatest(data.account_id);
  if (data.type == proto.main.NormalAskType.SECONDARY) {
    await available_balance.update({
      id: availableBalance[0].id,
      student_account_id: availableBalance[0].student_account_id,
      amount_uupx: (parseInt(availableBalance[0].amount_uupx) - parseInt(data.amount_uupx)).toString(),
      // amount_spx: availableBalance[0].amount_spx,
    });
  }
});
