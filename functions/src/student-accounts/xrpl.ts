/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable require-jsdoc */

/* eslint-disable camelcase */
import { student_account } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { admin_private } from '../admin-privates';
import { AccountPrivate } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const adminAccount = await admin_account.getByName('admin');
  const adminPrivate = await admin_private.list(adminAccount[0].id);
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

    // アカウント作成時、試験的に50トークンずつ付与する仕様に（精算には含めていない）
    const sender = xrpl.Wallet.fromSeed(adminPrivate[0].xrp_seed_hot);
    const sendSPXTx = {
      TransactionType: 'Payment',
      Account: sender.address,
      Amount: {
        currency: 'SPX',
        value: String(50),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: wallet.address,
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
    const sendUPXTx = {
      TransactionType: 'Payment',
      Account: sender.address,
      Amount: {
        currency: 'UPX',
        value: String(50),
        issuer: adminAccount[0].xrp_address_cold,
      },
      Destination: wallet.address,
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
    return wallet;
  }
  const wallet = await createWallet();

  await student_account.update({ id: data.id, xrp_address: wallet.classicAddress, xrp_public_key: wallet.publicKey });
  await account_private.create(
    new AccountPrivate({ student_account_id: data.id, xrp_private_key: wallet.privateKey, xrp_seed: wallet.seed }),
  );
});
