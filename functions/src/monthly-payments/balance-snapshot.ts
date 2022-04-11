/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { monthly_payment } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { balance_snapshot } from '../balance-snapshots';
import { balance } from '../balances';
import { discount_price } from '../discount-prices';
import { insufficient_balance } from '../insufficient-balances';
import { monthly_usage } from '../monthly-usages';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_bid_history } from '../normal-bid-histories';
import { primary_ask } from '../primary-asks';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_bid_history } from '../renewable-bid-histories';
import { MonthlyPayment, MonthlyUsage } from '@local/common';
import * as crypto from 'crypto-js';
import * as functions from 'firebase-functions';

balance_snapshot.onCreateHandler.push(async (snapshot, context) => {
  console.log('run balanceSS onCreate');
  const data = snapshot.data()!;
  const insufficiencies = (await insufficient_balance.listLastMonth(data.student_account_id)).reduce(
    (sum, element) => sum + element.amount,
    0,
  );
  const tokens = data.amount_upx + data.amount_spx - insufficiencies;

  const primaryAsks = await primary_ask.listLastMonthByID(data.student_account_id);
  const normalBids = await normal_bid_history.listLastMonth(data.student_account_id);
  const normalAsks = await normal_ask_history.listLastMonth(data.student_account_id);
  const renewableBids = await renewable_bid_history.listLastMonth(data.student_account_id);
  const renewableAsks = await renewable_ask_history.listLastMonth(data.student_account_id);

  let usage = !primaryAsks.length ? -tokens : primaryAsks.reduce((previous, current) => previous + current.amount, 0) - tokens;
  let payment = !primaryAsks.length ? 0 : primaryAsks.reduce((previous, current) => previous + current.price * current.amount, 0);

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
  const date = new Date();
  // .getMonth()は0-11の整数値をとる
  // date.setMonth(date.getMonth() - 1);

  const latestBalance = await balance.getLatest(data.student_account_id);
  await balance.update({ id: latestBalance[0].id, student_account_id: latestBalance[0].student_account_id, amount_spx: 0, amount_upx: 0 });

  await monthly_payment.create(
    new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear(),
      month: date.getMonth(),
      amount_jpy: payment,
    }),
  );
  await monthly_usage.create(
    new MonthlyUsage({
      student_account_id: data.student_account_id,
      year: date.getFullYear(),
      month: date.getMonth(),
      amount_kwh: usage,
    }),
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
  const config = functions.config();
  const confXrpl = config['xrpl'];
  const privKey = confXrpl.private_key;
  const decrypted = crypto.AES.decrypt(accountPrivate[0].xrp_seed, privKey);
  const sender = xrpl.Wallet.fromSeed(decrypted);

  const amountSPX = data.amount_spx;
  const amountUPX = data.amount_upx;
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
