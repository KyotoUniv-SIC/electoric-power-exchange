/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { daily_payment } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { balance } from '../balances';
import { insufficient_balance } from '../insufficient-balances';
import { InsufficientBalance, DailyPayment, Balance } from '@local/common';
import * as crypto from 'crypto-js';

daily_payment.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as DailyPayment;
  const accountBalance = await balance.listLatest(data.student_account_id);
  await balance.create(
    new Balance({
      student_account_id: data.student_account_id,
      amount_uupx: (parseInt(accountBalance[0].amount_uupx) - parseInt(data.amount_uupx)).toString(),
      amount_uspx: (parseInt(accountBalance[0].amount_uspx) - parseInt(data.amount_uspx)).toString(),
    }),
  );

  if (data.amount_insufficiency != '0') {
    await insufficient_balance.create(
      new InsufficientBalance({ student_account_id: data.student_account_id, amount_utoken: data.amount_insufficiency }),
    );
  }

  const accountPrivate = await account_private.list(data.student_account_id);
  if (!accountPrivate.length) {
    console.log(data.student_account_id, 'no XRP address');
    return;
  }
  const adminAccount = await admin_account.getByName('admin');

  const xrpl = require('xrpl');
  const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
  const client = new xrpl.Client(TEST_NET);

  const privKey = process.env.PRIV_KEY;
  if (!privKey) {
    console.log('no privKey');
    return;
  }
  const decrypted = crypto.AES.decrypt(accountPrivate[0].xrp_seed, privKey).toString(crypto.enc.Utf8);

  if (data.amount_uupx != '0') {
    await client.connect();
    const sender = xrpl.Wallet.fromSeed(decrypted);
    const vli = await client.getLedgerIndex();
    const sendUPXTx = {
      TransactionType: 'Payment',
      Account: sender.address,
      Amount: {
        currency: 'UPX',
        value: (parseInt(data.amount_uupx) / 1000000).toString(),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: adminAccount[0].xrp_address_hot,
      LastLedgerSequence: vli + 540,
    };
    const payPreparedUPX = await client.autofill(sendUPXTx);
    const paySignedUPX = sender.sign(payPreparedUPX);
    const payResultUPX = await client.submitAndWait(paySignedUPX.tx_blob);
    if (payResultUPX.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySignedUPX.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `${data.student_account_id} UPX Error sending transaction: ${payResultUPX.result.meta.TransactionResult}`;
    }
    client.disconnect();
  }

  if (data.amount_uspx != '0') {
    await client.connect();
    const sender = xrpl.Wallet.fromSeed(decrypted);
    const vli = await client.getLedgerIndex();
    const sendSPXTx = {
      TransactionType: 'Payment',
      Account: sender.address,
      Amount: {
        currency: 'SPX',
        value: (parseInt(data.amount_uspx) / 1000000).toString(),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: adminAccount[0].xrp_address_hot,
      LastLedgerSequence: vli + 540,
    };
    const payPreparedSPX = await client.autofill(sendSPXTx);
    const paySignedSPX = sender.sign(payPreparedSPX);
    const payResultSPX = await client.submitAndWait(paySignedSPX.tx_blob);
    if (payResultSPX.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySignedSPX.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `${data.student_account_id} SPX Error sending transaction: ${payResultSPX.result.meta.TransactionResult}`;
    }
    client.disconnect();
  }
});
