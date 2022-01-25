import { Balance, DailyUsage } from '@local/common';

describe('Daily Usage Test', () => {
  it('Daily withdrawal', () => {
    const data = new DailyUsage({ room_id: 'test01', amount_kwh: 5 });
    // const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 100 })];
    const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 0 })];
    if (!accountBalance.length) {
      return;
    }
    if (data.amount_kwh < accountBalance[0].amount_spx) {
      const updatedBalance = new Balance({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_upx: accountBalance[0].amount_upx,
        amount_spx: accountBalance[0].amount_spx - data.amount_kwh,
      });
      console.log(updatedBalance);
      expect(updatedBalance.amount_spx).toBe(95);
    } else {
      const spxShortage = data.amount_kwh - accountBalance[0].amount_spx;
      const updatedBalance = new Balance({
        id: accountBalance[0].id,
        student_account_id: accountBalance[0].student_account_id,
        amount_upx: accountBalance[0].amount_upx - spxShortage,
        amount_spx: 0,
      });
      console.log(updatedBalance);
      expect(updatedBalance.amount_upx).toBe(95);
    }
  });
});
