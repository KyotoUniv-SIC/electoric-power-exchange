/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { monthly_payment } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { balance_snapshot } from '../balance-snapshots';
import { daily_usage } from '../daily-usages';
import { discount_price } from '../discount-prices';
import { insufficient_balance } from '../insufficient-balances';
import { monthly_usage } from '../monthly-usages';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_bid_history } from '../normal-bid-histories';
import { primary_ask } from '../primary-asks';
import { primary_bid } from '../primary-bids';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_bid_history } from '../renewable-bid-histories';
import { student_account } from '../student-accounts';
import { MonthlyPayment, MonthlyUsage } from '@local/common';

balance_snapshot.onCreateHandler.push(async (snapshot, context) => {
  console.log('run balanceSS onCreate');
  const data = snapshot.data()!;
  const insufficiencies = (await insufficient_balance.listLastMonth(data.student_account_id)).reduce(
    (sum, element) => sum + element.amount,
    0,
  );
  const tokens = data.amount_upx + data.amount_spx - insufficiencies;

  const primaryBids = await primary_bid.getLatest(data.student_account_id);
  const normalBids = await normal_bid_history.listLastMonth(data.student_account_id);
  const normalAsks = await normal_ask_history.listLastMonth(data.student_account_id);
  const renewableBids = await renewable_bid_history.listLastMonth(data.student_account_id);
  const renewableAsks = await renewable_ask_history.listLastMonth(data.student_account_id);
  const studentAccount = await student_account.get(data.student_account_id);
  const dailyUsages = await daily_usage.listLastMonth(studentAccount.room_id);

  let usage = !primaryBids.length ? -tokens : primaryBids[0].amount - tokens;
  let payment = !primaryBids.length ? 0 : primaryBids[0].price * primaryBids[0].amount;

  const primaryAsks = await primary_ask.listLastMonth();
  const discounts = await discount_price.listLatest();
  if (!primaryAsks.length) {
    tokens >= 0 ? (payment -= (27 - discounts[0].price) * tokens) : (payment += (27 + discounts[0].price) * Math.abs(tokens));
  } else {
    tokens >= 0
      ? (payment -= (primaryAsks[0].price - discounts[0].price) * tokens)
      : (payment += (primaryAsks[0].price + discounts[0].price) * Math.abs(tokens));
  }

  for (const normalBid of normalBids) {
    if (normalBid.is_accepted == true) {
      usage += normalBid.amount;
      payment += normalBid.contract_price * normalBid.amount;
    }
  }
  for (const normalAsk of normalAsks) {
    if (normalAsk.is_accepted == true) {
      usage -= normalAsk.amount;
      payment -= normalAsk.contract_price * normalAsk.amount;
    }
  }
  for (const renewableBid of renewableBids) {
    if (renewableBid.is_accepted == true) {
      usage += renewableBid.amount;
      payment += renewableBid.contract_price * renewableBid.amount;
    }
  }
  for (const renewableAsk of renewableAsks) {
    if (renewableAsk.is_accepted == true) {
      usage -= renewableAsk.amount;
      payment -= renewableAsk.contract_price * renewableAsk.amount;
    }
  }
  for (const dailyUsage of dailyUsages) {
    usage += dailyUsage.amount_kwh;
  }
  const date = new Date();
  // .getMonth()は0-11の整数値をとる
  // date.setMonth(date.getMonth() - 1);

  await monthly_payment.create(
    new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      amount_jpy: payment,
    }),
  );
  await monthly_usage.create(
    new MonthlyUsage({ student_account_id: data.student_account_id, year: date.getFullYear(), month: date.getMonth(), amount_kwh: usage }),
  );

  const accountPrivate = await account_private.list(data.student_account_id);
  if (!accountPrivate.length) {
    console.log(data.student_account_id, 'no XRP address');
    return;
  }
  const xrpl = require('xrpl');
  const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
  const client = new xrpl.Client(TEST_NET);
  const adminAccount = await admin_account.getByName('admin');
  await client.connect();
  const sender = xrpl.Wallet.fromSeed(accountPrivate[0].xrp_seed);
  const amountSPX = data.amount_spx - insufficiencies;
  const amountUPX = amountSPX > 0 ? data.amount_upx : data.amount_upx + amountSPX;
  if (amountSPX > 0) {
    const sendTokenTx = {
      TransactionType: 'Payment',
      Account: sender.address,
      Amount: {
        currency: 'SPX',
        value: String(amountSPX),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: adminAccount[0].xrp_address_hot,
    };
    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = sender.sign(payPrepared);
    const payResult = await client.submitAndWait(paySigned.tx_blob);
    if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    }
  }
  if (amountUPX > 0) {
    const sendTokenTx = {
      TransactionType: 'Payment',
      Account: sender.address,
      Amount: {
        currency: 'UPX',
        value: String(amountUPX),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: adminAccount[0].xrp_address_hot,
    };
    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = sender.sign(payPrepared);
    const payResult = await client.submitAndWait(paySigned.tx_blob);
    if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    }
  }
  client.disconnect();
});
