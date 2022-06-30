/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
// import { monthly_usage } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { admin_private } from '../admin-privates';
import { balance } from '../balances';
import { daily_usage } from '../daily-usages';
import { primary_ask } from '../primary-asks';
import { primary_bid } from '../primary-bids';
import { student_account } from '../student-accounts';
import { MonthlyUsage, PrimaryAsk, Balance } from '@local/common';
import * as crypto from 'crypto-js';
import { Timestamp } from 'firebase/firestore';

// monthly_usage.onCreateHandler.push();
export const monthlyUsageOnCreate = async (snapshot: any, context: any) => {
  // 前年同月=>前月に参照するデータを変更
  // const now = new Date();
  // const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  // const usageAmount = !monthlyUsage.length ? 0 : monthlyUsage[0].amount_kwh_str;
  // const issueAmount = usageAmount < 120 ? 108 : usageAmount * 0.9;

  const data = snapshot.data()! as MonthlyUsage;
  const studentID = data.student_account_id;
  const student = await student_account.get(studentID);
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  let primaryAsk: PrimaryAsk;
  if ((student.created_at as Timestamp).toDate() > lastMonth) {
    // 一ヶ月以内に作成されたアカウントの場合
    const usages = await daily_usage.listLastMonth(student.room_id);
    const uupxAmount = usages.reduce((previous, current) => previous + parseInt(current.amount_kwh_str), 0) * 1000000;
    if (!uupxAmount) {
      console.log(student.room_id, 'have no usage data');
    }
    primaryAsk = new PrimaryAsk({ account_id: studentID, price_ujpy: '27000000', amount_uupx: uupxAmount.toString() });
  } else {
    // 一ヶ月以内に作成されたアカウントでない場合
    const issueAmount = data.amount_mwh;
    primaryAsk = new PrimaryAsk({ account_id: studentID, price_ujpy: '27000000', amount_uupx: issueAmount });
  }

  await primary_ask.create(primaryAsk);
  await primary_bid.create(primaryAsk);
  await balance.create(
    new Balance({
      student_account_id: studentID,
      amount_uupx: primaryAsk.amount_uupx,
      amount_uspx: '0',
    }),
  );

  // to do
  // txを配列に保存してドキュメントに保存
  // forループで直列に処理する

  // XRPL tx
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
  const privKey = process.env.PRIV_KEY;
  if (!privKey) {
    console.log('no privKey');
    return;
  }
  const decrypted = crypto.AES.decrypt(accountPrivate[0].xrp_seed, privKey).toString(crypto.enc.Utf8);
  const studentAccount = xrpl.Wallet.fromSeed(decrypted);
  const trustLine = await client.request({
    command: 'account_lines',
    account: studentAccount.address,
    ledger_index: 'validated',
  });
  const spxAmount: string = trustLine.result.lines.find((line: { currency: string }) => line.currency == 'SPX').balance;
  const upxAmount: string = trustLine.result.lines.find((line: { currency: string }) => line.currency == 'UPX').balance;

  if (parseInt(spxAmount) > 0) {
    const vli = await client.getLedgerIndex();
    const sendTokenTx = {
      TransactionType: 'Payment',
      Account: studentAccount.address,
      Amount: {
        currency: 'SPX',
        value: spxAmount,
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: adminAccount[0].xrp_address_hot,
      LastLedgerSequence: vli + 540,
    };
    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = studentAccount.sign(payPrepared);
    const payResult = await client.submitAndWait(paySigned.tx_blob);
    if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    }
  }

  // トークン回収用
  // if (parseInt(upxAmount) > 0) {
  //   const vli = await client.getLedgerIndex();
  //   const sendTokenTx = {
  //     TransactionType: 'Payment',
  //     Account: studentAccount.address,
  //     Amount: {
  //       currency: 'UPX',
  //       value: upxAmount,
  //       issuer: adminAccount[0].xrp_address_cold,
  //     },
  //     Destination: adminAccount[0].xrp_address_hot,
  //     LastLedgerSequence: vli + 540,
  //   };
  //   const payPrepared = await client.autofill(sendTokenTx);
  //   const paySigned = studentAccount.sign(payPrepared);
  //   const payResult = await client.submitAndWait(paySigned.tx_blob);
  //   if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
  //     console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
  //   } else {
  //     // eslint-disable-next-line no-throw-literal
  //     throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
  //   }
  // }

  // 残高とPrimaryAskでTxを計算
  const askAmount = parseInt(primaryAsk.amount_uupx);
  const balanceAmount = parseInt(upxAmount) * 1000000;
  if (askAmount > balanceAmount) {
    const adminPrivate = await admin_private.list(adminAccount[0].id);
    const encryptedSeed = adminPrivate[0].xrp_seed_hot;
    const decryptedSeed = crypto.AES.decrypt(encryptedSeed, privKey).toString(crypto.enc.Utf8);

    const admin = xrpl.Wallet.fromSeed(decryptedSeed);
    const vli = await client.getLedgerIndex();
    const sendTokenTx = {
      TransactionType: 'Payment',
      Account: admin.address,
      Amount: {
        currency: 'UPX',
        value: ((askAmount - balanceAmount) / 1000000).toString(),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: studentAccount.address,
      LastLedgerSequence: vli + 540,
    };
    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = admin.sign(payPrepared);
    const payResult = await client.submitAndWait(paySigned.tx_blob);
    if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `${data.student_account_id} UPX Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    }
  } else if (askAmount < balanceAmount) {
    const vli = await client.getLedgerIndex();
    const sendTokenTx = {
      TransactionType: 'Payment',
      Account: studentAccount.address,
      Amount: {
        currency: 'UPX',
        value: ((balanceAmount - askAmount) / 1000000).toString(),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: adminAccount[0].xrp_address_hot,
      LastLedgerSequence: vli + 540,
    };
    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = studentAccount.sign(payPrepared);
    const payResult = await client.submitAndWait(paySigned.tx_blob);
    if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `${data.student_account_id} UPX Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    }
  }
  client.disconnect();
};
