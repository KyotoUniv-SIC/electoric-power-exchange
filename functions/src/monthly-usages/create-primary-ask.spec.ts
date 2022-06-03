/* eslint-disable require-jsdoc */

/* eslint-disable @typescript-eslint/no-var-requires */
import { MonthlyUsage, PrimaryAsk } from '@local/common';

jest.setTimeout(30000);
describe('Primary Ask Test', () => {
  it('MonthlyUsage bulid primary ask', async () => {
    const data = new MonthlyUsage({ student_account_id: 'test01', year: '2021', month: '12', amount_mwh: '110000000' });
    const studentID = data.student_account_id;
    const issueAmount = data.amount_mwh;
    const primaryAsk = new PrimaryAsk({
      account_id: studentID,
      price_ujpy: '27000000',
      amount_uupx: issueAmount,
    });
    expect(primaryAsk.amount_uupx).toBe('110000000');
  });
});
