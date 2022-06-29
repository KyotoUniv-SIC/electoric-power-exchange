/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { primary_ask } from '.';
import { admin_account } from '../admin-accounts';
import { admin_private } from '../admin-privates';
import { balance } from '../balances';
import { primary_bid } from '../primary-bids';
import { student_account } from '../student-accounts';
import { Balance, PrimaryAsk, PrimaryBid } from '@local/common';
import * as crypto from 'crypto-js';

primary_ask.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as PrimaryAsk;
  await primary_bid.create(new PrimaryBid(data, data.created_at, data.updated_at));
  const askAmount = parseInt(data.amount_uupx);
  const studentID = data.account_id;
  const studentAccount = await student_account.get(studentID);
  const accountBalance = await balance.listLatest(data.account_id);
  if (!accountBalance.length) {
    return;
  }
  await balance.create(
    new Balance({
      student_account_id: data.account_id,
      amount_uupx: (parseInt(accountBalance[0].amount_uupx) + askAmount).toString(),
      amount_uspx: accountBalance[0].amount_uspx,
    }),
  );

  if (!studentAccount.xrp_address) {
    console.log(studentAccount.id, 'no XRP address');
    return;
  }
  const xrpl = require('xrpl');
  const adminAccount = await admin_account.getByName('admin');
  const adminPrivate = await admin_private.list(adminAccount[0].id);
  const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
  const client = new xrpl.Client(TEST_NET);
  await client.connect();

  const privKey = process.env.PRIV_KEY;
  if (!privKey) {
    console.log('no privKey');
    return;
  }

  const encryptedSeed = adminPrivate[0].xrp_seed_hot;
  const decryptedSeed = crypto.AES.decrypt(encryptedSeed, privKey).toString(crypto.enc.Utf8);

  const admin = xrpl.Wallet.fromSeed(decryptedSeed);
  const vli = await client.getLedgerIndex();
  const sendTokenTx = {
    TransactionType: 'Payment',
    Account: admin.address,
    Amount: {
      currency: 'UPX',
      value: (parseInt(data.amount_uupx) / 1000000).toString(),
      issuer: adminAccount[0].xrp_address_cold,
    },
    Destination: studentAccount.xrp_address,
    LastLedgerSequence: vli + 540,
  };
  const payPrepared = await client.autofill(sendTokenTx);
  const paySigned = admin.sign(payPrepared);
  const payResult = await client.submitAndWait(paySigned.tx_blob);
  if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
  } else {
    // eslint-disable-next-line no-throw-literal
    throw `${data.account_id} UPX Error sending transaction: ${payResult.result.meta.TransactionResult}`;
  }
  client.disconnect();
});
