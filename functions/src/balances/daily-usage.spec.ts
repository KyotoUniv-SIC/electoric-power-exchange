import { Balance, DailyUsage } from '@local/common';

describe('Daily Usage Test', () => {
  it('Daily withdrawal', () => {
    const data = new DailyUsage({ room_id: 'test01', amount_kwh_str: '5' });
    const usage = Number(data.amount_kwh_str);
    // const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 100 })];
    const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 0 })];
    const totalBalance = accountBalance[0].amount_spx + accountBalance[0].amount_upx;
    if (!accountBalance.length) {
      return;
    }
    if (usage <= accountBalance[0].amount_spx) {
      const updatedBalance = new Balance({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_upx: accountBalance[0].amount_upx,
        amount_spx: accountBalance[0].amount_spx - usage,
      });
      console.log(updatedBalance);
      expect(updatedBalance.amount_spx).toBe(95);
    } else if (usage < totalBalance) {
      const spxShortage = usage - accountBalance[0].amount_spx;
      const updatedBalance = new Balance({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_upx: accountBalance[0].amount_upx - spxShortage,
        amount_spx: 0,
      });
      console.log(updatedBalance);
      expect(updatedBalance.amount_upx).toBe(95);
    } else {
      const insufficiency = usage - totalBalance;
      const updatedBalance = new Balance({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_upx: 0,
        amount_spx: 0,
      });
      console.log('Insufficient', insufficiency);
      expect(updatedBalance.amount_upx).toBe(0);
    }
  });
});
