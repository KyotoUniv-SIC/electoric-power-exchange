/* eslint-disable camelcase */
import { balance } from '.';
import { market_status } from '../market-statuses';
import { normal_settlement } from '../normal-settlements';
import { MarketStatus } from '@local/common';

normal_settlement.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  const bidderBalance = await balance.getLatest(data.bid_id);
  await balance.update({
    id: bidderBalance[0].id,
    student_account_id: data.bid_id,
    amount_upx: bidderBalance[0].amount_upx + data.amount,
    // amount_spx: bidderBalance[0].amount_spx,
  });

  const sellerBalance = await balance.getLatest(data.ask_id);
  await balance.update({
    id: sellerBalance[0].id,
    student_account_id: data.ask_id,
    amount_upx: sellerBalance[0].amount_upx - data.amount,
    // amount_spx: sellerBalance[0].amount_spx,
  });

  const marketStatus = await market_status.getToday();
  if (!marketStatus.length) {
    await market_status.create(new MarketStatus({ is_finished_normal: true, is_finished_renewable: false }));
  } else {
    await market_status.update({ id: marketStatus[0].id, is_finished_normal: true });
  }
});
