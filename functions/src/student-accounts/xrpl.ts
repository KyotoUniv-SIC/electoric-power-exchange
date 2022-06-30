/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable require-jsdoc */

/* eslint-disable camelcase */
import { student_account } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { daily_usage } from '../daily-usages';
import { primary_ask } from '../primary-asks';
import { primaryAskOnCreate } from '../primary-asks/create-balance';
import { AccountPrivate, PrimaryAsk, StudentAccount } from '@local/common';
import * as crypto from 'crypto-js';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as StudentAccount;
  const adminAccount = await admin_account.getByName('admin');
  // const adminPrivate = await admin_private.list(adminAccount[0].id);
  const xrpl = require('xrpl');
  async function createWallet() {
    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    await client.connect();

    const fundResult = await client.fundWallet();
    const wallet = fundResult.wallet;
    const normalDenom = 'UPX';
    const renewableDenom = 'SPX';
    const issuerAddress = adminAccount[0].xrp_address_cold;
    const trustSetTxNormal = {
      TransactionType: 'TrustSet',
      Account: wallet.address,
      LimitAmount: {
        currency: normalDenom,
        issuer: issuerAddress,
        // Large limit, arbitrarily chosen
        value: '10000000000',
      },
    };

    const tsPreparedNormal = await client.autofill(trustSetTxNormal);
    const tsSignedNormal = wallet.sign(tsPreparedNormal);
    const tsResultNormal = await client.submitAndWait(tsSignedNormal.tx_blob);
    if (tsResultNormal.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${tsSignedNormal.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${tsResultNormal.result.meta.TransactionResult}`;
    }

    const trustSetTxRenewable = {
      TransactionType: 'TrustSet',
      Account: wallet.address,
      LimitAmount: {
        currency: renewableDenom,
        issuer: issuerAddress,
        // Large limit, arbitrarily chosen
        value: '10000000000',
      },
    };

    const tsPreparedRenewable = await client.autofill(trustSetTxRenewable);
    const tsSignedRenewable = wallet.sign(tsPreparedRenewable);
    const tsResultRenewable = await client.submitAndWait(tsSignedRenewable.tx_blob);
    if (tsResultRenewable.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${tsSignedRenewable.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${tsResultRenewable.result.meta.TransactionResult}`;
    }
    client.disconnect();
    return wallet;
  }
  const wallet = await createWallet();

  await student_account.update({ id: data.id, xrp_address: wallet.classicAddress, xrp_public_key: wallet.publicKey });
  const privKey = process.env.PRIV_KEY;
  if (privKey) {
    const encryptedSeed = crypto.AES.encrypt(wallet.seed, privKey).toString();
    await account_private.create(new AccountPrivate({ student_account_id: data.id, xrp_seed: encryptedSeed }));
  } else {
    console.log('No privKey detected!');
  }

  // create Primary Tx
  let student = await student_account.get(data.id);
  while (!student.room_id) {
    student = await student_account.get(data.id);
  }
  const usages = await daily_usage.listLastMonth(student.room_id);
  const uupxAmount = usages.reduce((previous, current) => previous + parseInt(current.amount_kwh_str), 0) * 1000000;
  if (!uupxAmount) {
    console.log(student.room_id, 'have no usage data');
  }
  const primaryAsk = new PrimaryAsk({ account_id: data.id, price_ujpy: '27000000', amount_uupx: uupxAmount.toString() });
  await primary_ask.create(primaryAsk);
  await primaryAskOnCreate({ data: () => primaryAsk }, null);
});
