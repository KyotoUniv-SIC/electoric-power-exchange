/* eslint-disable camelcase */
import { balance } from '.';
import { renewable_settlement } from '../renewable-settlements';
import { Balance } from '@local/common';

renewable_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  const bidderBalance = await balance.getLatest(data.bid_id);
  await balance.create(
    new Balance({
      student_account_id: data.bid_id,
      amount_upx: bidderBalance[0].amount_upx,
      amount_spx: bidderBalance[0].amount_spx + data.amount,
    }),
  );

  const sellerBalance = await balance.getLatest(data.ask_id);
  await balance.create(
    new Balance({
      student_account_id: data.ask_id,
      amount_upx: sellerBalance[0].amount_upx,
      amount_spx: sellerBalance[0].amount_spx - data.amount,
    }),
  );
});
