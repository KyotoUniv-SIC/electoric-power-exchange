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
import { BalanceSnapshot, MonthlyPayment, MonthlyUsage } from '@local/common';
import * as crypto from 'crypto-js';
import * as functions from 'firebase-functions';

balance_snapshot.onCreateHandler.push(async (snapshot, context) => {
  console.log('run balanceSS onCreate');
  const data = snapshot.data()! as BalanceSnapshot;
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

  let usage = !primaryAsks.length
    ? -tokens
    : primaryAsks.reduce((previous, current) => previous + parseInt(current.amount_uupx), 0) - tokens;
  let payment = !primaryAsks.length
    ? 0
    : primaryAsks.reduce((previous, current) => previous + (parseInt(current.price_ujpy) * parseInt(current.amount_uupx)) / 1000000, 0);

  const discounts = await discount_price.listLatest();
  if (!primaryAsks.length) {
    tokens >= 0
      ? (payment -= ((27 * 1000000 - parseInt(discounts[0].price_ujpy)) * tokens) / 1000000)
      : (payment += ((27 * 1000000 + parseInt(discounts[0].price_ujpy)) * Math.abs(tokens)) / 1000000);
  } else {
    tokens >= 0
      ? (payment -= ((parseInt(primaryAsks[0].price_ujpy) - parseInt(discounts[0].price_ujpy)) * tokens) / 1000000)
      : (payment += ((parseInt(primaryAsks[0].price_ujpy) + parseInt(discounts[0].price_ujpy)) * Math.abs(tokens)) / 1000000);
  }

  for (const normalBid of normalBids) {
    if (normalBid.is_accepted == true) {
      usage += parseInt(normalBid.amount_uupx);
      payment += (parseInt(normalBid.contract_price_ujpy) * parseInt(normalBid.amount_uupx)) / 1000000;
    }
  }
  for (const normalAsk of normalAsks) {
    if (normalAsk.is_accepted == true) {
      usage -= parseInt(normalAsk.amount_uupx);
      payment -= (parseInt(normalAsk.contract_price_ujpy) * parseInt(normalAsk.amount_uupx)) / 1000000;
    }
  }
  for (const renewableBid of renewableBids) {
    if (renewableBid.is_accepted == true) {
      usage += parseInt(renewableBid.amount_uspx);
      payment += (parseInt(renewableBid.contract_price_ujpy) * parseInt(renewableBid.amount_uspx)) / 1000000;
    }
  }
  for (const renewableAsk of renewableAsks) {
    if (renewableAsk.is_accepted == true) {
      usage -= parseInt(renewableAsk.amount_uspx);
      payment -= (parseInt(renewableAsk.contract_price_ujpy) * parseInt(renewableAsk.amount_uspx)) / 1000000;
    }
  }
  const date = new Date();
  // .getMonth()は0-11の整数値をとる
  // date.setMonth(date.getMonth() - 1);

  const latestBalance = await balance.getLatest(data.student_account_id);
  await balance.update({
    id: latestBalance[0].id,
    student_account_id: latestBalance[0].student_account_id,
    amount_uspx: '0',
    amount_uupx: '0',
  });

  await monthly_payment.create(
    new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear().toString(),
      month: date.getMonth().toString(),
      amount_ujpy: payment.toString(),
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

  const amountSPX = parseInt(data.amount_uspx);
  const amountUPX = parseInt(data.amount_uupx);
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
