/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable require-jsdoc */

/* eslint-disable camelcase */
import { student_account } from '.';
import { account_private } from '../account-privates';
import { AccountPrivate } from '@local/common';

student_account.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const xrpl = require('xrpl');
  async function createWallet() {
    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    await client.connect();

    const testWallet = xrpl.Wallet.generate();
    console.log(testWallet);
    client.disconnect();
    return testWallet;
  }
  const wallet = await createWallet();

  await student_account.update({ id: data.id, xrp_address: wallet.classicAddress, xrp_public_key: wallet.publicKey });
  await account_private.create(
    new AccountPrivate({ student_account_id: data.id, xrp_private_key: wallet.privateKey, xrp_seed: wallet.seed }),
  );
});
