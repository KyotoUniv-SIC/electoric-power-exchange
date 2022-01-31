/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-var-requires */
jest.setTimeout(30000);
describe('XRPL Create Wallet Test', () => {
  it('create wallet', async () => {
    const xrpl = require('xrpl');
    async function createWallet() {
      const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
      const client = new xrpl.Client(TEST_NET);
      await client.connect();

      // const testWallet = xrpl.Wallet.generate();
      const fundResult = await client.fundWallet();
      const testWallet = fundResult.wallet;

      const normal = 'UPX';
      const renewable = 'SPX';
      const issuerAddress = 'rQK41zJnYwZet2ffHrGnVuuYE5rD6pGAhU';
      const trustSetTxNormal = {
        TransactionType: 'TrustSet',
        Account: testWallet.address,
        LimitAmount: {
          currency: normal,
          issuer: issuerAddress,
          // Large limit, arbitrarily chosen
          value: '10000000000',
        },
      };

      const tsPreparedNormal = await client.autofill(trustSetTxNormal);
      const tsSignedNormal = testWallet.sign(tsPreparedNormal);
      console.log('Creating trust line from hot address to issuer...');
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
          currency: renewable,
          issuer: issuerAddress,
          // Large limit, arbitrarily chosen
          value: '10000000000',
        },
      };

      const tsPreparedRenewable = await client.autofill(trustSetTxRenewable);
      const tsSignedRenewable = testWallet.sign(tsPreparedRenewable);
      console.log('Creating trust line from hot address to issuer...');
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
    console.log(wallet);

    expect(true).toBeTruthy;
  });
});
