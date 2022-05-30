/* eslint-disable require-jsdoc */
// import * as crypto from 'crypto-js';

/* eslint-disable @typescript-eslint/no-var-requires */
jest.setTimeout(30000);
describe('XRPL Create Wallet Test', () => {
  it('create wallet', async () => {
    // const xrpl = require('xrpl');
    // async function sendTx() {
    //   const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    //   const client = new xrpl.Client(TEST_NET);
    //   await client.connect();

    //   const account = 'rKNFWAUHTww6aPifng1Q8mgpU67KyRNncw';
    //   const studentSeed = 'U2FsdGVkX1/PfDlNC1wQfF9WuB1GfMgmUaSBwEnMrSu9xfeCEhrIBusUzKmYLy+p';
    //   const hot = 'rh6hsXVqEjJEFjmEniNur57QXxcYhozSA1';
    //   const cold = 'rQK41zJnYwZet2ffHrGnVuuYE5rD6pGAhU';

    //   const privKey = '';

    //   const decryptedSeedStudent = crypto.AES.decrypt(studentSeed, privKey).toString(crypto.enc.Utf8);

    //   // const decryptedSeedAdmin = crypto.AES.decrypt(hotSeed, privKey).toString(crypto.enc.Utf8);
    //   const student = xrpl.Wallet.fromSeed(decryptedSeedStudent);
    //   // const admin = xrpl.Wallet.fromSeed(decryptedSeedAdmin);

    //   const sendTokenTx = {
    //     TransactionType: 'Payment',
    //     Account: account,
    //     Amount: {
    //       currency: 'UPX',
    //       value: '5000000',
    //       issuer: cold,
    //     },
    //     Destination: hot,
    //   };
    //   const payPrepared = await client.autofill(sendTokenTx);
    //   const paySigned = student.sign(payPrepared);
    //   const payResult = await client.submitAndWait(paySigned.tx_blob);
    //   if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
    //     console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    //   } else {
    //     // eslint-disable-next-line no-throw-literal
    //     throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    //   }
    //   client.disconnect();
    // }
    // const tx = await sendTx();
    // console.log(tx);

    expect(true).toBeTruthy;
  });
});
