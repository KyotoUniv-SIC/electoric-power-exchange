/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { primary_ask } from '.';
import { admin_account } from '../admin-accounts';
import { admin_private } from '../admin-privates';
import { monthly_usage } from '../monthly-usages';
import { student_account } from '../student-accounts';
import { PrimaryAsk } from '@local/common';

monthly_usage.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const studentID = data.student_account_id;
  const studentAccount = await student_account.get(studentID);
  const now = new Date();
  const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  const usageAmount = !monthlyUsage.length ? 0 : monthlyUsage[0].amount_kwh;
  const issueAmount = usageAmount < 120 ? 108 : usageAmount * 0.9;
  await primary_ask.create(
    new PrimaryAsk({
      account_id: studentID,
      price: 27,
      amount: issueAmount,
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
  const admin = xrpl.Wallet.fromSeed(adminPrivate[0].xrp_seed_hot);
  const sendTokenTx = {
    TransactionType: 'Payment',
    Account: admin.address,
    Amount: {
      currency: 'UPX',
      value: String(issueAmount),
      issuer: adminAccount[0].xrp_address_cold,
    },
    Destination: studentAccount.xrp_address,
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

  // 全員分作るものはコメントアウト
  // const students = await student_account.list();

  // for (const student of students) {
  //   const studentID = student.id;
  //   const now = new Date();
  //   const monthlyUsage = await monthly_usage.getLastYear(studentID, now);
  //   const usageAmount = !monthlyUsage.length ? 120 : monthlyUsage[0].amount_kwh;
  //   await primary_ask.create(
  //     new PrimaryAsk({
  //       account_id: studentID,
  //       price: 27,
  //       amount: usageAmount * 0.9,
  //     }),
  //   );
  // }
});
