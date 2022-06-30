/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
// import { balance_snapshot } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { balance } from '../balances';
import { discount_price } from '../discount-prices';
import { insufficient_balance } from '../insufficient-balances';
import { monthly_payment } from '../monthly-payments';
import { monthly_usage } from '../monthly-usages';
import { monthlyUsageOnCreate } from '../monthly-usages/create-primary-ask';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_bid_history } from '../normal-bid-histories';
import { primary_ask } from '../primary-asks';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_bid_history } from '../renewable-bid-histories';
import { renewable_ranking } from '../renewable-rankings';
import { renewable_reward_setting } from '../renewable-reward-settings';
import { Balance, BalanceSnapshot, MonthlyPayment, MonthlyUsage } from '@local/common';
import * as crypto from 'crypto-js';

// balance_snapshot.onCreateHandler.push();
export const balanceSnapshotOnCreate = async (snapshot: any, context: any) => {
  const data = snapshot.data()! as BalanceSnapshot;
  console.log(data.student_account_id, 'adjustment start.');
  const insufficiencies = (await insufficient_balance.listLastMonth(data.student_account_id)).reduce(
    (sum, element) => sum + parseInt(element.amount_utoken),
    0,
  );
  const tokens = parseInt(data.amount_uupx) + parseInt(data.amount_uspx) - insufficiencies;

  const primaryAsks = await primary_ask.listLastMonthByID(data.student_account_id);
  const normalBids = await normal_bid_history.listLastMonth(data.student_account_id);
  const normalAsks = await normal_ask_history.listLastMonth(data.student_account_id);
  const renewableBids = await renewable_bid_history.listLastMonth(data.student_account_id);
  const renewableAsks = await renewable_ask_history.listLastMonth(data.student_account_id);
  const discounts = await discount_price.listLatest();
  const uspxRanking = await renewable_ranking.getLatest();
  const rewardSetting = await renewable_reward_setting.getLatest();

  let usage: number;
  let primaryPayment: number;
  let adjustPayment: number;

  // primaryPayment, adjustPaymentの算出
  if (primaryAsks.length) {
    usage = primaryAsks.reduce((previous, current) => previous + parseInt(current.amount_uupx), 0) - tokens;
    primaryPayment = primaryAsks.reduce(
      (previous, current) => previous + (parseInt(current.price_ujpy) * parseInt(current.amount_uupx)) / 1000000,
      0,
    );
    if (tokens >= 0) {
      adjustPayment = -((parseInt(primaryAsks[0].price_ujpy) - parseInt(discounts[0].price_ujpy)) * tokens) / 1000000;
    } else {
      adjustPayment = -((parseInt(primaryAsks[0].price_ujpy) + parseInt(discounts[0].price_ujpy)) * tokens) / 1000000;
    }
  } else {
    usage = -tokens;
    primaryPayment = 0;
    if (tokens >= 0) {
      adjustPayment = -((27 * 1000000 - parseInt(discounts[0].price_ujpy)) * tokens) / 1000000;
    } else {
      adjustPayment = -((27 * 1000000 + parseInt(discounts[0].price_ujpy)) * tokens) / 1000000;
    }
  }

  // rewardPaymentの算出
  let rewardPayment: number;
  if (uspxRanking.first_student_id == data.student_account_id) {
    rewardPayment = -parseInt(rewardSetting.first_price_ujpy);
  } else if (uspxRanking.second_student_id == data.student_account_id) {
    rewardPayment = -parseInt(rewardSetting.second_price_ujpy);
  } else if (uspxRanking.third_student_id == data.student_account_id) {
    rewardPayment = -parseInt(rewardSetting.third_price_ujpy);
  } else {
    rewardPayment = 0;
  }

  // marketPaymentの算出
  let marketPayment = 0;
  for (const normalBid of normalBids) {
    if (normalBid.is_accepted == true) {
      usage += parseInt(normalBid.amount_uupx);
      marketPayment += (parseInt(normalBid.contract_price_ujpy) * parseInt(normalBid.amount_uupx)) / 1000000;
    }
  }
  for (const normalAsk of normalAsks) {
    if (normalAsk.is_accepted == true) {
      usage -= parseInt(normalAsk.amount_uupx);
      marketPayment -= (parseInt(normalAsk.contract_price_ujpy) * parseInt(normalAsk.amount_uupx)) / 1000000;
    }
  }
  for (const renewableBid of renewableBids) {
    if (renewableBid.is_accepted == true) {
      usage += parseInt(renewableBid.amount_uspx);
      marketPayment += (parseInt(renewableBid.contract_price_ujpy) * parseInt(renewableBid.amount_uspx)) / 1000000;
    }
  }
  for (const renewableAsk of renewableAsks) {
    if (renewableAsk.is_accepted == true) {
      usage -= parseInt(renewableAsk.amount_uspx);
      marketPayment -= (parseInt(renewableAsk.contract_price_ujpy) * parseInt(renewableAsk.amount_uspx)) / 1000000;
    }
  }

  const date = new Date();
  // .getMonth()は0-11の整数値をとる
  // date.setMonth(date.getMonth() - 1);

  const latestBalance = await balance.listLatest(data.student_account_id);
  await balance.create(
    new Balance({
      student_account_id: latestBalance[0].student_account_id,
      amount_uspx: '0',
      amount_uupx: '0',
    }),
  );

  await monthly_payment.create(
    new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear().toString(),
      month: date.getMonth().toString(),
      amount_ujpy: (primaryPayment + adjustPayment + marketPayment + rewardPayment).toString(),
      amount_primary_ujpy: primaryPayment.toString(),
      amount_adjust_ujpy: adjustPayment.toString(),
      amount_market_ujpy: marketPayment.toString(),
      amount_reward_ujpy: rewardPayment.toString(),
    }),
  );
  const monthlyUsage = new MonthlyUsage({
    student_account_id: data.student_account_id,
    year: date.getFullYear().toString(),
    month: date.getMonth().toString(),
    amount_mwh: usage.toString(),
  });
  await monthly_usage.create(monthlyUsage);
  await monthlyUsageOnCreate({ data: () => monthlyUsage }, null);
};
