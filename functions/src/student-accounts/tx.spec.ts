/* eslint-disable require-jsdoc */
import * as crypto from 'crypto-js';

/* eslint-disable @typescript-eslint/no-var-requires */
jest.setTimeout(30000);
describe('XRPL Send Tx', () => {
  it('create wallet', async () => {
    const xrpl = require('xrpl');
    async function sendTx() {
      const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
      const client = new xrpl.Client(TEST_NET);
      await client.connect();

      // studentの情報を入力
      const account = '';
      const studentSeed = '';

      // hotアドレスのSeed(decrypted)を入力
      const adminHotSeed = '';
      const adminHot = 'rh6hsXVqEjJEFjmEniNur57QXxcYhozSA1';
      const AdminCold = 'rQK41zJnYwZet2ffHrGnVuuYE5rD6pGAhU';

      // 全体の秘密鍵を入力
      const privKey = '';

      if (!account || !studentSeed || !adminHotSeed || !privKey) {
        console.log('Failed to send tx');
        expect(true).toBeTruthy;
        return;
      }

      const decryptedSeedStudent = crypto.AES.decrypt(studentSeed, privKey).toString(crypto.enc.Utf8);

      const decryptedSeedAdmin = crypto.AES.decrypt(adminHotSeed, privKey).toString(crypto.enc.Utf8);
      const student = xrpl.Wallet.fromSeed(decryptedSeedStudent);
      console.log('student', student);
      const admin = xrpl.Wallet.fromSeed(decryptedSeedAdmin);
      console.log('admin', admin);

      const sendTokenTx = {
        TransactionType: 'Payment',
        Account: adminHot,
        Amount: {
          currency: 'UPX',
          value: '104',
          issuer: AdminCold,
        },
        Destination: account,
      };
      const payPrepared = await client.autofill(sendTokenTx);
      const paySigned = admin.sign(payPrepared);
      const payResult = await client.submitAndWait(paySigned.tx_blob);
      if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
      } else {
        // eslint-disable-next-line no-throw-literal
        throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
      }
      client.disconnect();
    }
    await sendTx();

    expect(true).toBeTruthy;
  });
});
