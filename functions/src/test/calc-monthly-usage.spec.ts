/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { balance } from '../balances';
import { monthly_payment } from '../monthly-payments';
import { monthly_usage } from '../monthly-usages';
import {
  Balance,
  BalanceSnapshot,
  DiscountPrice,
  MonthlyPayment,
  MonthlyUsage,
  NormalAskHistory,
  NormalBidHistory,
  PrimaryAsk,
  RenewableAskHistory,
  RenewableBidHistory,
  RenewableRanking,
  RenewableRewardSetting,
} from '@local/common';
import * as functions from 'firebase-functions-test';
import 'jest';

const testConfig = functions(
  {
    storageBucket: 'edison-test-f6ac3.appspot.com', // firebase管理画面から取得
    projectId: 'edison-test-f6ac3', // firebase管理画面から取得
  },
  './test-server.json',
);

describe('servers', () => {
  it('Calculate monthly usage', async () => {
    const data = new BalanceSnapshot({});
    console.log(data.student_account_id, 'adjustment start.');
    const studentID = data.student_account_id;
    const insufficiencies = 10;
    const tokens = parseInt(data.amount_uupx) + parseInt(data.amount_uspx) - insufficiencies;
    const primaryAsks = [
      new PrimaryAsk({
        account_id: studentID,
        price_ujpy: '27000000',
        amount_uupx: data.amount_uupx,
      }),
      new PrimaryAsk({
        account_id: studentID,
        price_ujpy: '28000000',
        amount_uupx: data.amount_uupx,
      }),
    ];
    const normalBids = [
      new NormalBidHistory({
        account_id: studentID,
        price_ujpy: '27000000',
        amount_uupx: data.amount_uupx,
        is_accepted: true,
      }),
      new NormalBidHistory({
        account_id: studentID,
        price_ujpy: '28000000',
        amount_uupx: data.amount_uupx,
        is_accepted: true,
      }),
    ];
    const normalAsks = [
      new NormalAskHistory({
        account_id: studentID,
        price_ujpy: '26000000',
        amount_uupx: data.amount_uupx,
      }),
      new NormalAskHistory({
        account_id: studentID,
        price_ujpy: '26000000',
        amount_uupx: data.amount_uupx,
      }),
    ];
    const renewableBids = [
      new RenewableBidHistory({
        account_id: studentID,
        price_ujpy: '27500000',
        amount_uspx: data.amount_uspx,
      }),
      new RenewableBidHistory({
        account_id: studentID,
        price_ujpy: '28000000',
        amount_uspx: data.amount_uspx,
      }),
    ];
    const renewableAsks = [
      new RenewableAskHistory({
        account_id: studentID,
        price_ujpy: '27000000',
        amount_uspx: data.amount_uspx,
      }),
      new RenewableAskHistory({
        account_id: studentID,
        price_ujpy: '27200000',
        amount_uspx: data.amount_uspx,
      }),
    ];
    const discounts = [
      new DiscountPrice({
        price_ujpy: '26000000',
        amount_purchase_utoken: '0',
        amount_sale_utoken: '10',
      }),
      new DiscountPrice({
        price_ujpy: '26500000',
        amount_purchase_utoken: '0',
        amount_sale_utoken: '10',
      }),
    ];
    const uspxRanking = new RenewableRanking({});
    const rewardSetting = new RenewableRewardSetting({});

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

    const latestBalance = [
      new Balance({
        student_account_id: studentID,
        amount_uspx: '10',
        amount_uupx: '15',
      }),
      new Balance({
        student_account_id: studentID,
        amount_uspx: '12',
        amount_uupx: '10',
      }),
    ];
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
    await monthly_usage.create(
      new MonthlyUsage({
        student_account_id: data.student_account_id,
        year: date.getFullYear().toString(),
        month: date.getMonth().toString(),
        amount_mwh: usage.toString(),
      }),
    );
  });
});
