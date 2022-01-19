/* eslint-disable camelcase */
import { balance_snapshot } from '.';
import { balance } from '../balances';
import { discount_price } from '../discount-prices';
import { market_status } from '../market-statuses';
import { primary_ask } from '../primary-asks';
import { student_account } from '../student-accounts';
import { BalanceSnapshot, DiscountPrice } from '@local/common';
import { Timestamp } from 'firebase/firestore';

market_status.onUpdateHandler.push(async (snapshot, context) => {
  const data = snapshot.after.data()!;

  if ((data.created_at as Timestamp).toDate().getDate() == 1 && data.is_finished_normal == true && data.is_finished_renewable == true) {
    const students = await student_account.list();
    let purchase = 0;
    let sale = 0;
    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLatest(studentID);
      const totalBalance = lastMonthBalance[0].amount_spx + lastMonthBalance[0].amount_upx;
      totalBalance >= 0 ? (purchase += totalBalance) : (sale += -totalBalance);
    }
    const primaryEanings = await primary_ask.listLastMonth();
    let income = 0;
    for (const eaning of primaryEanings) {
      income += eaning.price * eaning.amount;
    }
    // システム運用コスト
    const cost = 0;
    // 電気料金
    const electricity = 1000000;
    const price =
      (cost + electricity - income + (purchase - sale) * primaryEanings[0].price) / ((purchase + sale) * primaryEanings[0].price);
    await discount_price.create(new DiscountPrice({ price: price, amount_purchase: purchase, amount_sale: sale }));

    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLatest(studentID);
      await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
    }
  } else {
    return;
  }
});
