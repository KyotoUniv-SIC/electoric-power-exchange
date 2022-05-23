/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { balance } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { daily_payment } from '../daily-payments';
import { daily_usage } from '../daily-usages';
import { insufficient_balance } from '../insufficient-balances';
import { student_account } from '../student-accounts';
import { InsufficientBalance, DailyPayment, proto } from '@local/common';
import * as crypto from 'crypto-js';
import * as functions from 'firebase-functions';

daily_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as proto.main.DailyUsage;
  const usage = parseInt(data.amount_kwh) * 1000000;
  const studentAccounts = await student_account.getByRoomID(data.room_id);
  if (!studentAccounts.length) {
    console.log(data.room_id, 'no student');
    return;
  }
  if (usage <= 0) {
    console.log('0 or minus usage detected');
    return;
  }
  for (const student of studentAccounts) {
    const accountBalance = await balance.getLatest(student.id);
    const uupxAmount = parseInt(accountBalance[0].amount_uspx);
    const uspxAmount = parseInt(accountBalance[0].amount_uupx);
    const totalBalance = uupxAmount + uspxAmount;
    const accountPrivate = await account_private.list(student.id);
    const xrpl = require('xrpl');
    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    const adminAccount = await admin_account.getByName('admin');
    const date = new Date();

    await daily_payment.create(
      new DailyPayment({
        student_account_id: student.id,
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
        date: date.getDate().toString(),
        amount_mwh: usage.toString(),
      }),
    );

    if (usage <= uspxAmount) {
      await balance.update({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_uspx: (uspxAmount - usage).toString(),
      });
      if (!accountPrivate.length) {
        console.log(student.id, 'no XRP address');
        return;
      }
      await client.connect();
      const config = functions.config();
      const confXrpl = config['xrpl'];
      const privKey = confXrpl.private_key;
      const decrypted = crypto.AES.decrypt(accountPrivate[0].xrp_seed, privKey);
      const sender = xrpl.Wallet.fromSeed(decrypted);
      const sendTokenTx = {
        TransactionType: 'Payment',
        Account: sender.address,
        Amount: {
          currency: 'SPX',
          value: usage.toString(),
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
      client.disconnect();
    } else if (usage < totalBalance) {
      const spxShortage = usage - uspxAmount;
      await balance.update({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_uupx: (uupxAmount - spxShortage).toString(),
        amount_uspx: '0',
      });
      if (!accountPrivate.length) {
        console.log(student.id, 'no XRP address');
        return;
      }
      await client.connect();

      const config = functions.config();
      const confXrpl = config['xrpl'];
      const privKey = confXrpl.private_key;
      const decrypted = crypto.AES.decrypt(accountPrivate[0].xrp_seed, privKey);
      const sender = xrpl.Wallet.fromSeed(decrypted);

      if (uspxAmount > 0) {
        const sendSPXTx = {
          TransactionType: 'Payment',
          Account: sender.address,
          Amount: {
            currency: 'SPX',
            value: uspxAmount.toString(),
            issuer: adminAccount[0].xrp_address_cold,
          },
          Destination: adminAccount[0].xrp_address_hot,
        };
        const payPreparedSPX = await client.autofill(sendSPXTx);
        const paySignedSPX = sender.sign(payPreparedSPX);
        const payResultSPX = await client.submitAndWait(paySignedSPX.tx_blob);
        if (payResultSPX.result.meta.TransactionResult == 'tesSUCCESS') {
          console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySignedSPX.hash}`);
        } else {
          // eslint-disable-next-line no-throw-literal
          throw `Error sending transaction: ${payResultSPX.result.meta.TransactionResult}`;
        }
      }
      const sendUPXTx = {
        TransactionType: 'Payment',
        Account: sender.address,
        Amount: {
          currency: 'UPX',
          value: String(spxShortage),
          issuer: adminAccount[0].xrp_address_cold,
        },
        Destination: adminAccount[0].xrp_address_hot,
      };
      const payPreparedUPX = await client.autofill(sendUPXTx);
      const paySignedUPX = sender.sign(payPreparedUPX);
      const payResultUPX = await client.submitAndWait(paySignedUPX.tx_blob);
      if (payResultUPX.result.meta.TransactionResult == 'tesSUCCESS') {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySignedUPX.hash}`);
      } else {
        // eslint-disable-next-line no-throw-literal
        throw `Error sending transaction: ${payResultUPX.result.meta.TransactionResult}`;
      }
      client.disconnect();
    } else {
      const insufficiency = usage - totalBalance;
      await balance.update({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_uupx: '0',
        amount_uspx: '0',
      });
      await insufficient_balance.create(
        new InsufficientBalance({ student_account_id: accountBalance[0].student_account_id, amount_utoken: insufficiency.toString() }),
      );

      if (!accountPrivate.length) {
        console.log(student.id, 'no XRP address');
        return;
      }
      await client.connect();
      const config = functions.config();
      const confXrpl = config['xrpl'];
      const privKey = confXrpl.private_key;
      const decrypted = crypto.AES.decrypt(accountPrivate[0].xrp_seed, privKey);
      const sender = xrpl.Wallet.fromSeed(decrypted);
      if (uspxAmount > 0) {
        const sendSPXTx = {
          TransactionType: 'Payment',
          Account: sender.address,
          Amount: {
            currency: 'SPX',
            value: uspxAmount.toString(),
            issuer: adminAccount[0].xrp_address_cold,
          },
          Destination: adminAccount[0].xrp_address_hot,
        };
        const payPreparedSPX = await client.autofill(sendSPXTx);
        const paySignedSPX = sender.sign(payPreparedSPX);
        const payResultSPX = await client.submitAndWait(paySignedSPX.tx_blob);
        if (payResultSPX.result.meta.TransactionResult == 'tesSUCCESS') {
          console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySignedSPX.hash}`);
        } else {
          // eslint-disable-next-line no-throw-literal
          throw `Error sending transaction: ${payResultSPX.result.meta.TransactionResult}`;
        }
      }
      if (uupxAmount > 0) {
        const sendUPXTx = {
          TransactionType: 'Payment',
          Account: sender.address,
          Amount: {
            currency: 'UPX',
            value: uupxAmount.toString(),
            issuer: adminAccount[0].xrp_address_cold,
          },
          Destination: adminAccount[0].xrp_address_hot,
        };
        const payPreparedUPX = await client.autofill(sendUPXTx);
        const paySignedUPX = sender.sign(payPreparedUPX);
        const payResultUPX = await client.submitAndWait(paySignedUPX.tx_blob);
        if (payResultUPX.result.meta.TransactionResult == 'tesSUCCESS') {
          console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySignedUPX.hash}`);
        } else {
          // eslint-disable-next-line no-throw-literal
          throw `Error sending transaction: ${payResultUPX.result.meta.TransactionResult}`;
        }
      }
      client.disconnect();
    }
  }
});
