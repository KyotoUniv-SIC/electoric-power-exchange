/* eslint-disable require-jsdoc */

/* eslint-disable @typescript-eslint/no-var-requires */
import { MonthlyUsage, PrimaryAsk } from '@local/common';

jest.setTimeout(30000);
describe('Primary Ask Test', () => {
  it('MonthlyUsage bulid primary ask', async () => {
    const data = new MonthlyUsage({ student_account_id: 'test01', year: 2021, month: 12, amount_kwh: 110 });
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
    expect(primaryAsk.amount).toBe(112.5);
  });
});
