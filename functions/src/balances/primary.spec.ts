import { Balance, PrimaryAsk } from '@local/common';

describe('Primary Balance Test', () => {
  it('Primary balance reset', () => {
    const data = new PrimaryAsk({ account_id: 'test01', price_ujpy: '27000000', amount_uupx: '112500000' });
    const askAmount = parseInt(data.amount_uupx);
    const accountBalance = [new Balance({ student_account_id: 'test01', amount_uupx: '0', amount_uspx: '0' })];
    if (!accountBalance.length) {
      return;
    }
    const updatedBalance = new Balance({
      student_account_id: data.account_id,
      amount_uupx: (parseInt(accountBalance[0].amount_uupx) + askAmount).toString(),
      amount_uspx: accountBalance[0].amount_uspx,
    });
    console.log(updatedBalance);
    expect(updatedBalance.amount_uupx).toBe('112500000');
    expect(updatedBalance.amount_uspx).toBe('0');
  });
});
