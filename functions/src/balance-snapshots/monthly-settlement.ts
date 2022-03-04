/* eslint-disable camelcase */
import { balance_snapshot } from '.';
import { admin_account } from '../admin-accounts';
import { balance } from '../balances';
import { cost_setting } from '../cost-settings';
import { discount_price } from '../discount-prices';
import { insufficient_balance } from '../insufficient-balances';
import { normal_ask_history } from '../normal-ask-histories';
import { primary_ask } from '../primary-asks';
import { renewable_ask_history } from '../renewable-ask-histories';
import { student_account } from '../student-accounts';
import { BalanceSnapshot, DiscountPrice } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.monthlySettlement = f.pubsub
  .schedule('0 9 1 * *')
  // .schedule('every 10 minutes')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();
    let purchase = 0;
    let sale = 0;
    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLatest(studentID);
      const insufficiencies = (await insufficient_balance.listLastMonth(studentID)).reduce((sum, element) => sum + element.amount, 0);
      const totalBalance = lastMonthBalance[0].amount_spx + lastMonthBalance[0].amount_upx - insufficiencies;
      totalBalance >= 0 ? (purchase += totalBalance) : (sale += -totalBalance);
    }
    const adminAccount = await admin_account.getByName('admin');
    const primaryAsks = await primary_ask.listLastMonth();
    const normalAsks = await normal_ask_history.listLastMonth(adminAccount[0].id);
    const renewableAsks = await renewable_ask_history.listLastMonth(adminAccount[0].id);
    let income = 0;
    for (const ask of primaryAsks) {
      income += ask.price * ask.amount;
    }
    for (const ask of normalAsks) {
      if (ask.is_accepted) {
        income += ask.price * ask.amount;
      }
    }
    for (const ask of renewableAsks) {
      if (ask.is_accepted) {
        income += ask.price * ask.amount;
      }
    }

    const setting = await cost_setting.getLatest();
    // システム運用コスト
    const cost = !setting ? 0 : setting.system;
    // 電気料金
    const electricity = !setting ? 150000 : setting.electricity;

    const price =
      // (cost + electricity - income + (purchase - sale) * primaryEanings[0].price) / ((purchase + sale) * primaryEanings[0].price);
      (cost + electricity - income + (purchase - sale) * 27) / ((purchase + sale) * 27);

    await discount_price.create(new DiscountPrice({ price: price, amount_purchase: purchase, amount_sale: sale }));

    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLatest(studentID);
      await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
    }
  });
