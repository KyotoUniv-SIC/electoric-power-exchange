/* eslint-disable camelcase */
import { balance } from '.';
import { market_status } from '../market-statuses';
import { normal_settlement } from '../normal-settlements';
import { Balance, MarketStatus } from '@local/common';

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

  const marketStatus = await market_status.list();
  if (!marketStatus.length) {
    await market_status.create(new MarketStatus({ is_finished_normal: true, is_finished_renewable: false }));
  } else {
    await market_status.update(new MarketStatus({ is_finished_normal: true }));
  }
});
