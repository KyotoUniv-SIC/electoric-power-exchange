import { BalanceSnapshot, MonthlyUsage, PrimaryAsk } from '@local/common';

describe('Primary Ask Test', () => {
  it('balance snapshot bulid primary ask', () => {
    const data = new BalanceSnapshot({ id: 'balance01', student_account_id: 'test01', amount_upx: 100, amount_spx: 100 });
    const studentID = data.student_account_id;
    // const now = new Date();
    const monthlyUsage = [new MonthlyUsage({ student_account_id: 'test01', year: 2020, month: 12, amount_kwh: 125 })];
    const usageAmount = !monthlyUsage.length ? 120 : monthlyUsage[0].amount_kwh;
    const primaryAsk = new PrimaryAsk({
      account_id: studentID,
      price: 27,
      amount: usageAmount * 0.9,
    });
    console.log(primaryAsk);
    expect(primaryAsk.amount).toBe(112.5);
  });
});
