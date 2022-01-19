import { Balance, PrimaryAsk } from '@local/common';

describe('Primary Balance Test', () => {
  it('Primary balance reset', () => {
    const data = new PrimaryAsk({ account_id: 'test01', price: 27, amount: 112.5 });
    const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 100 })];
    if (!accountBalance.length) {
      return;
    }
    const updatedBalance = new Balance({ student_account_id: data.account_id, amount_upx: data.amount, amount_spx: 0 });
    console.log(updatedBalance);
    expect(updatedBalance.amount_upx).toBe(112.5);
    expect(updatedBalance.amount_spx).toBe(0);
  });
});
