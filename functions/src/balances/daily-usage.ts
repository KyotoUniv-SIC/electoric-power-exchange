/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { balance } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { daily_usage } from '../daily-usages';
import { insufficient_balance } from '../insufficient-balances';
import { student_account } from '../student-accounts';
import { InsufficientBalance } from '@local/common';

daily_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const usage = Number(data.amount_kwh_str);
  await daily_usage.update({ id: data.id, amount_kwh: usage });
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
    const totalBalance = accountBalance[0].amount_spx + accountBalance[0].amount_upx;
    const accountPrivate = await account_private.list(student.id);
    const xrpl = require('xrpl');
    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    const adminAccount = await admin_account.getByName('admin');

    if (usage <= accountBalance[0].amount_spx) {
      await balance.update({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        // amount_upx: accountBalance[0].amount_upx,
        amount_spx: accountBalance[0].amount_spx - usage,
      });
      if (!accountPrivate.length) {
        console.log(student.id, 'no XRP address');
        return;
      }
      await client.connect();
      const sender = xrpl.Wallet.fromSeed(accountPrivate[0].xrp_seed);
      const sendTokenTx = {
        TransactionType: 'Payment',
        Account: sender.address,
        Amount: {
          currency: 'SPX',
          value: data.amount_kwh_str,
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
      const spxShortage = usage - accountBalance[0].amount_spx;
      await balance.update({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_upx: accountBalance[0].amount_upx - spxShortage,
        amount_spx: 0,
      });
      if (!accountPrivate.length) {
        console.log(student.id, 'no XRP address');
        return;
      }
      await client.connect();
      const sender = xrpl.Wallet.fromSeed(accountPrivate[0].xrp_seed);
      if (accountBalance[0].amount_spx > 0) {
        const sendSPXTx = {
          TransactionType: 'Payment',
          Account: sender.address,
          Amount: {
            currency: 'SPX',
            value: String(accountBalance[0].amount_spx),
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
        amount_upx: 0,
        amount_spx: 0,
      });
      await insufficient_balance.create(
        new InsufficientBalance({ student_account_id: accountBalance[0].student_account_id, amount: insufficiency }),
      );

      if (!accountPrivate.length) {
        console.log(student.id, 'no XRP address');
        return;
      }
      await client.connect();
      const sender = xrpl.Wallet.fromSeed(accountPrivate[0].xrp_seed);
      if (accountBalance[0].amount_spx > 0) {
        const sendSPXTx = {
          TransactionType: 'Payment',
          Account: sender.address,
          Amount: {
            currency: 'SPX',
            value: String(accountBalance[0].amount_spx),
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
      if (accountBalance[0].amount_upx > 0) {
        const sendUPXTx = {
          TransactionType: 'Payment',
          Account: sender.address,
          Amount: {
            currency: 'UPX',
            value: String(accountBalance[0].amount_upx),
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
