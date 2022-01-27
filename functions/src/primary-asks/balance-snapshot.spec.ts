/* eslint-disable require-jsdoc */

/* eslint-disable @typescript-eslint/no-var-requires */
import { BalanceSnapshot, MonthlyUsage, PrimaryAsk } from '@local/common';

jest.setTimeout(30000);
describe('Primary Ask Test', () => {
  it('balance snapshot bulid primary ask', async () => {
    const data = new BalanceSnapshot({ id: 'balance01', student_account_id: 'test01', amount_upx: 100, amount_spx: 100 });
    const studentID = data.student_account_id;
    // const now = new Date();
    const monthlyUsage = [new MonthlyUsage({ student_account_id: 'test01', year: 2020, month: 12, amount_kwh: 125 })];
    const usageAmount = !monthlyUsage.length ? 120 : monthlyUsage[0].amount_kwh;
    const issueAmount = usageAmount * 0.9;
    const primaryAsk = new PrimaryAsk({
      account_id: studentID,
      price: 27,
      amount: issueAmount,
    });
    const xrpl = require('xrpl');
    const issuerAddress = 'rQK41zJnYwZet2ffHrGnVuuYE5rD6pGAhU';
    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    await client.connect();
    const admin = xrpl.Wallet.fromSeed('safVZqWMxC6jNWNZFXRbq1diwNKzr');
    // 作成しただけのWallet
    // const testAddress = 'rKDej1Ym1btvM3qrNXFUdrPpnp8UBuE5rz';
    // FundしたWallet
    // const testAddress = 'rDnFWrGiPUp7Ns4Gyovt6HEBvZfmuC6iXm';
    // TrustSetまでしたWallet
    const testAddress = 'rNE3M6cWwERrwzvaXxQLqgN76sZQ9aFV8Q';
    const sendTokenTx = {
      TransactionType: 'Payment',
      Account: admin.address,
      Amount: {
        currency: 'UPX',
        value: String(issueAmount),
        issuer: issuerAddress,
      },
      Destination: testAddress,
    };
    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = admin.sign(payPrepared);

    console.log(`Sending ${issueAmount} ${'UPX'} to ${testAddress}...`);
    const payResult = await client.submitAndWait(paySigned.tx_blob);
    if (payResult.result.meta.TransactionResult == 'tesSUCCESS') {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${paySigned.hash}`);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw `Error sending transaction: ${payResult.result.meta.TransactionResult}`;
    }
    client.disconnect();
    expect(primaryAsk.amount).toBe(112.5);
  });
});
