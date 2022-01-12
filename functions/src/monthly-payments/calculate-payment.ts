/* eslint-disable camelcase */
import { monthly_payment } from '.';
import { balance_snapshot } from '../balance-snapshots';
import { daily_usage } from '../daily-usages';
import { discount_price } from '../discount-prices';
import { monthly_usage } from '../monthly-usages';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_bid_history } from '../normal-bid-histories';
import { primary_ask } from '../primary-asks';
import { primary_bid } from '../primary-bids';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_bid_history } from '../renewable-bid-histories';
import { MonthlyPayment, MonthlyUsage } from '@local/common';

balance_snapshot.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const tokens = data.amount_upx + data.amount_spx;

  const primaryBid = await primary_bid.getLatest(data.student_account_id);
  const normalBids = await normal_bid_history.listLastMonth(data.student_account_id);
  const normalAsks = await normal_ask_history.listLastMonth(data.student_account_id);
  const renewableBids = await renewable_bid_history.listLastMonth(data.student_account_id);
  const renewableAsks = await renewable_ask_history.listLastMonth(data.student_account_id);
  const dailyUsages = await daily_usage.listLastMonth(data.student_account_id);

  let usage = primaryBid[0].amount - tokens;
  let payment = primaryBid[0].price * primaryBid[0].amount;

  const primaryAsks = await primary_ask.listLastMonth();
  const discounts = await discount_price.listLatest();
  tokens >= 0
    ? payment - (primaryAsks[0].price - discounts[0].price) * tokens
    : payment + (primaryAsks[0].price + discounts[0].price) * tokens;

  for (const normalBid of normalBids) {
    usage += normalBid.amount;
    payment += normalBid.contract_price * normalBid.amount;
  }
  for (const normalAsk of normalAsks) {
    usage -= normalAsk.amount;
    payment -= normalAsk.contract_price * normalAsk.amount;
  }
  for (const renewableBid of renewableBids) {
    usage += renewableBid.amount;
    payment += renewableBid.contract_price * renewableBid.amount;
  }
  for (const renewableAsk of renewableAsks) {
    usage -= renewableAsk.amount;
    payment -= renewableAsk.contract_price * renewableAsk.amount;
  }
  for (const dailyUsage of dailyUsages) {
    usage += dailyUsage.amount_kwh;
  }
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  await monthly_payment.create(
    new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear(),
      month: date.getMonth(),
      amount_jpy: payment,
    }),
  );
  await monthly_usage.create(
    new MonthlyUsage({ student_account_id: data.student_account_id, year: date.getFullYear(), month: date.getMonth(), amount_kwh: usage }),
  );
});
