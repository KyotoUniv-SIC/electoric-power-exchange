import { Balance, DailyUsage, StudentAccount } from '@local/common';

describe('Daily Usage Test', () => {
  it('Daily withdrawal', () => {
    const data = new DailyUsage({ room_id: 'room01', amount_kwh_str: '5' });
    const usage = Number(data.amount_kwh_str);
    const studentAccounts = [new StudentAccount({ id: 'test01', room_id: 'room01' })];
    if (!studentAccounts.length) {
      console.log(data.room_id, 'no student');
      return;
    }
    if (usage <= 0) {
      console.log('0 or minus usage detected');
      return;
    }
    for (const student of studentAccounts) {
      // const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 100 })];
      const accountBalance = [new Balance({ student_account_id: 'test01', amount_upx: 100, amount_spx: 0 })];
      const totalBalance = accountBalance[0].amount_spx + accountBalance[0].amount_upx;
      if (usage <= accountBalance[0].amount_spx) {
        const updatedBalance = new Balance({
          id: accountBalance[0].id,
          student_account_id: student.id,
          amount_upx: accountBalance[0].amount_upx,
          amount_spx: accountBalance[0].amount_spx - usage,
        });
        console.log(updatedBalance);
        expect(updatedBalance.amount_spx).toBe(95);
      } else if (usage < totalBalance) {
        const spxShortage = usage - accountBalance[0].amount_spx;
        const updatedBalance = new Balance({
          id: accountBalance[0].id,
          student_account_id: student.id,
          amount_upx: accountBalance[0].amount_upx - spxShortage,
          amount_spx: 0,
        });
        console.log(updatedBalance);
        expect(updatedBalance.amount_upx).toBe(95);
      } else {
        const insufficiency = usage - totalBalance;
        const updatedBalance = new Balance({
          id: accountBalance[0].id,
          student_account_id: student.id,
          amount_upx: 0,
          amount_spx: 0,
        });
        console.log('Insufficient', insufficiency);
        expect(updatedBalance.amount_upx).toBe(0);
      }
    }
  });
});
