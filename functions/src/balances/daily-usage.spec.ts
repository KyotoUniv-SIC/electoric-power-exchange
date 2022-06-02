import { Balance, DailyUsage, StudentAccount } from '@local/common';

describe('Daily Usage Test', () => {
  it('Daily withdrawal', () => {
    const data = new DailyUsage({ room_id: 'room01', amount_kwh_str: '5' });
    const usage = parseInt(data.amount_kwh_str) * 1000000;
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
      const accountBalance = [new Balance({ student_account_id: 'test01', amount_uupx: '100000000', amount_uspx: '0' })];
      const uupxAmount = parseInt(accountBalance[0].amount_uspx);
      const uspxAmount = parseInt(accountBalance[0].amount_uupx);
      const totalBalance = uupxAmount + uspxAmount;
      if (usage <= uspxAmount) {
        const updatedBalance = new Balance({
          id: accountBalance[0].id,
          student_account_id: student.id,
          amount_uspx: (uspxAmount - usage).toString(),
        });
        console.log(updatedBalance);
        expect(updatedBalance.amount_uspx).toBe('95000000');
      } else if (usage < totalBalance) {
        const spxShortage = usage - uspxAmount;
        const updatedBalance = new Balance({
          id: accountBalance[0].id,
          student_account_id: student.id,
          amount_uupx: (uupxAmount - spxShortage).toString(),
          amount_uspx: '0',
        });
        console.log(updatedBalance);
        expect(updatedBalance.amount_uupx).toBe('95000000');
      } else {
        const insufficiency = usage - totalBalance;
        const updatedBalance = new Balance({
          id: accountBalance[0].id,
          student_account_id: student.id,
          amount_uupx: '0',
          amount_uspx: '0',
        });
        console.log('Insufficient', insufficiency);
        expect(updatedBalance.amount_uupx).toBe('0');
      }
    }
  });
});
