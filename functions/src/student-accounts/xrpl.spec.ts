/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-var-requires */
describe('XRPL Create Wallet Test', () => {
  it('create wallet', async () => {
    const xrpl = require('xrpl');
    async function createWallet() {
      const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
      const client = new xrpl.Client(TEST_NET);
      await client.connect();

      const testWallet = xrpl.Wallet.generate();
      client.disconnect();
      return testWallet;
    }
    const wallet = await createWallet();
    console.log(wallet);
    expect(true).toBeTruthy;
  });
});
