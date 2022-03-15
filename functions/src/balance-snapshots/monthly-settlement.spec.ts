import { Balance, BalanceSnapshot, DiscountPrice, MarketStatus, PrimaryAsk, StudentAccount } from '@local/common';
import { Timestamp } from 'firebase/firestore';

describe('Monthly Settlement Test', () => {
  it('dummy', () => {
    const dateOrg = new Timestamp(1645282821, 114000000);
    const dateJST = dateOrg.toDate();
    dateJST.setHours(dateJST.getHours() + 9);
    console.log(dateJST);
    console.log(dateJST.getDate());
    const data = new MarketStatus(
      { is_finished_normal: true, is_finished_renewable: true },
      Timestamp.fromDate(dateJST),
      Timestamp.fromDate(dateJST),
    );
    const students = [
      new StudentAccount({ id: 'test01' }),
      new StudentAccount({ id: 'test02' }),
      new StudentAccount({ id: 'test03' }),
      new StudentAccount({ id: 'test04' }),
    ];
    const balances = [
      new Balance({
        id: 'balance01',
        student_account_id: 'test01',
        amount_upx: 100,
        amount_spx: 100,
      }),
      new Balance({
        id: 'balance02',
        student_account_id: 'test02',
        amount_upx: -100,
        amount_spx: 0,
      }),
      new Balance({
        id: 'balance03',
        student_account_id: 'test03',
        amount_upx: 0,
        amount_spx: 0,
      }),
      new Balance({
        id: 'balance04',
        student_account_id: 'test04',
        amount_upx: 0,
        amount_spx: 200,
      }),
    ];
    const primaryEanings = [
      new PrimaryAsk({ id: 'primary01', account_id: 'test01', price: 27, amount: 120 }),
      new PrimaryAsk({ id: 'primary02', account_id: 'test02', price: 27, amount: 125 }),
      new PrimaryAsk({ id: 'primary03', account_id: 'test03', price: 27, amount: 150 }),
      new PrimaryAsk({ id: 'primary04', account_id: 'test04', price: 27, amount: 140 }),
    ];
    if (dateJST.getDate() == 20 && data.is_finished_normal == true && data.is_finished_renewable == true) {
      let purchase = 0;
      let sale = 0;
      for (const student of students) {
        const studentID = student.id;
        const lastMonthBalance = balances.filter((balance) => balance.student_account_id == studentID);
        const totalBalance = lastMonthBalance[0].amount_spx + lastMonthBalance[0].amount_upx;
        totalBalance >= 0 ? (purchase += totalBalance) : (sale += -totalBalance);
      }
      let income = 0;
      for (const eaning of primaryEanings) {
        income += eaning.price * eaning.amount;
      }
      // システム運用コスト
      const cost = 0;
      // 電気料金
      const electricity = 16000;
      const price =
        (cost + electricity - income + (purchase - sale) * primaryEanings[0].price) / ((purchase + sale) * primaryEanings[0].price);
      const discount = new DiscountPrice({ price: price, amount_purchase: purchase, amount_sale: sale });

      const balanceSnapshots = [];
      for (const student of students) {
        const studentID = student.id;
        const lastMonthBalance = balances.filter((balance) => balance.student_account_id == studentID);
        balanceSnapshots.push(new BalanceSnapshot(lastMonthBalance[0]));
      }
      console.log(discount);
      console.log(balanceSnapshots);
      expect(discount.amount_purchase).toBe(400);
      expect(discount.amount_sale).toBe(100);
      expect(balanceSnapshots).toEqual(balances);
    } else {
      console.log((data.created_at as Timestamp).toDate().getDate());
      expect(false).toBe(true);
    }
  });
});
