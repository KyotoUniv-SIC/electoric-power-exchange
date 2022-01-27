/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable require-jsdoc */

/* eslint-disable camelcase */
import { student_account } from '.';
import { account_private } from '../account-privates';
import { admin_account } from '../admin-accounts';
import { AccountPrivate } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const adminAccount = await admin_account.getByName('admin');
  const xrpl = require('xrpl');
  async function createWallet() {
    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    await client.connect();

    const fundResult = await client.fundWallet();
    const testWallet = fundResult.wallet;
    const normalDenom = 'UPX';
    const renewableDenom = 'SPX';
    const issuerAddress = adminAccount[0].xrp_address_cold;
    const trustSetTxNormal = {
      TransactionType: 'TrustSet',
      Account: testWallet.address,
      LimitAmount: {
        currency: normalDenom,
        issuer: issuerAddress,
        // Large limit, arbitrarily chosen
        value: '10000000000',
      },
    };

    const tsPreparedNormal = await client.autofill(trustSetTxNormal);
    const tsSignedNormal = testWallet.sign(tsPreparedNormal);
    const tsResultNormal = await client.submitAndWait(tsSignedNormal.tx_blob);
    if (tsResultNormal.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${tsSignedNormal.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${tsResultNormal.result.meta.TransactionResult}`;
    }

    const trustSetTxRenewable = {
      TransactionType: 'TrustSet',
      Account: testWallet.address,
      LimitAmount: {
        currency: renewableDenom,
        issuer: issuerAddress,
        // Large limit, arbitrarily chosen
        value: '10000000000',
      },
    };

    const tsPreparedRenewable = await client.autofill(trustSetTxRenewable);
    const tsSignedRenewable = testWallet.sign(tsPreparedRenewable);
    const tsResultRenewable = await client.submitAndWait(tsSignedRenewable.tx_blob);
    if (tsResultRenewable.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${tsSignedRenewable.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${tsResultRenewable.result.meta.TransactionResult}`;
    }
    client.disconnect();
    return testWallet;
  }
  const wallet = await createWallet();

  await student_account.update({ id: data.id, xrp_address: wallet.classicAddress, xrp_public_key: wallet.publicKey });
  await account_private.create(
    new AccountPrivate({ student_account_id: data.id, xrp_private_key: wallet.privateKey, xrp_seed: wallet.seed }),
  );
});
