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
    const students = [new StudentAccount({ id: 'test01' }), new StudentAccount({ id: 'test02' }), new StudentAccount({ id: 'test03' })];
    const balances = [
      new Balance({
        id: 'balance01',
        student_account_id: 'test01',
        amount_uupx: '100000000',
        amount_uspx: '200000000',
      }),
      new Balance({
        id: 'balance03',
        student_account_id: 'test02',
        amount_uupx: '0',
        amount_uspx: '0',
      }),
      new Balance({
        id: 'balance04',
        student_account_id: 'test03',
        amount_uupx: '0',
        amount_uspx: '100000000',
      }),
    ];
    const primaryEanings = [
      new PrimaryAsk({ id: 'primary01', account_id: 'test01', price_ujpy: '27000000', amount_uupx: '120000000' }),
      new PrimaryAsk({ id: 'primary02', account_id: 'test02', price_ujpy: '27000000', amount_uupx: '125000000' }),
      new PrimaryAsk({ id: 'primary03', account_id: 'test03', price_ujpy: '27000000', amount_uupx: '150000000' }),
    ];
    if (dateJST.getDate() == 20 && data.is_finished_normal == true && data.is_finished_renewable == true) {
      let purchase = 0;
      let sale = 0;
      for (const student of students) {
        const studentID = student.id;
        const lastMonthBalance = balances.filter((balance) => balance.student_account_id == studentID);
        const totalBalance = parseInt(lastMonthBalance[0].amount_uspx) + parseInt(lastMonthBalance[0].amount_uupx);
        totalBalance >= 0 ? (purchase += totalBalance) : (sale += -totalBalance);
      }
      let income = 0;
      for (const eaning of primaryEanings) {
        income += parseInt(eaning.price_ujpy) * parseInt(eaning.amount_uupx);
      }
      // システム運用コスト
      const cost = 0;
      // 電気料金
      const electricity = 16000000000;
      const price =
        (cost + electricity - income + (purchase - sale) * parseInt(primaryEanings[0].price_ujpy)) /
        ((purchase + sale) * parseInt(primaryEanings[0].price_ujpy));
      const discount = new DiscountPrice({
        price_ujpy: price.toString(),
        amount_purchase_utoken: purchase.toString(),
        amount_sale_utoken: sale.toString(),
      });

      const balanceSnapshots = [];
      for (const student of students) {
        const studentID = student.id;
        const lastMonthBalance = balances.filter((balance) => balance.student_account_id == studentID);
        balanceSnapshots.push(new BalanceSnapshot(lastMonthBalance[0]));
      }
      console.log(discount);
      console.log(balanceSnapshots);
      expect(discount.amount_purchase_utoken).toBe('400000000');
      expect(discount.amount_sale_utoken).toBe('0');
      expect(balanceSnapshots).toEqual(balances);
    } else {
      console.log((data.created_at as Timestamp).toDate().getDate());
      expect(false).toBe(true);
    }
  });
});
