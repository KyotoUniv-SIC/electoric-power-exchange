/* eslint-disable camelcase */
import { balance } from '.';
import { normal_settlement } from '../normal-settlements';
import { Balance } from '@local/common';

normal_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  const bidderBalance = await balance.getLatest(data.bid_id);
  await balance.update(
    new Balance({
      student_account_id: data.bid_id,
      amount_upx: bidderBalance[0].amount_upx + data.amount,
      amount_spx: bidderBalance[0].amount_spx,
    }),
  );

  const sellerBalance = await balance.getLatest(data.ask_id);
  await balance.update(
    new Balance({
      student_account_id: data.ask_id,
      amount_upx: sellerBalance[0].amount_upx - data.amount,
      amount_spx: sellerBalance[0].amount_spx,
    }),
  );
});
