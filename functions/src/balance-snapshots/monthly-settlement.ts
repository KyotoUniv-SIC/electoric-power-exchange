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
      const insufficiencies = (await insufficient_balance.listLastMonth(studentID)).reduce(
        (sum, element) => sum + parseInt(element.amount_utoken),
        0,
      );
      const totalBalance = parseInt(lastMonthBalance[0].amount_uspx) + parseInt(lastMonthBalance[0].amount_uupx) - insufficiencies;
      totalBalance >= 0 ? (purchase += totalBalance) : (sale += -totalBalance);
    }
    const adminAccount = await admin_account.getByName('admin');
    const primaryAsks = await primary_ask.listLastMonth();
    const normalAsks = await normal_ask_history.listLastMonth(adminAccount[0].id);
    const renewableAsks = await renewable_ask_history.listLastMonth(adminAccount[0].id);
    let income = 0;
    for (const ask of primaryAsks) {
      income += parseInt(ask.price_ujpy) * parseInt(ask.amount_uupx);
    }
    for (const ask of normalAsks) {
      if (ask.is_accepted) {
        income += parseInt(ask.price_ujpy) * parseInt(ask.amount_uupx);
      }
    }
    for (const ask of renewableAsks) {
      if (ask.is_accepted) {
        income += parseInt(ask.price_ujpy) * parseInt(ask.amount_uspx);
      }
    }

    const setting = await cost_setting.getLatest();
    // システム運用コスト
    const cost = !setting ? 0 : parseInt(setting.system_cost_ujpy);
    // 電気料金
    const electricity = !setting ? 150000 * 1000000 : parseInt(setting.electricity_cost_ujpy);

    const price =
      // (cost + electricity - income + (purchase - sale) * primaryEanings[0].price) / ((purchase + sale) * primaryEanings[0].price);
      (cost + electricity - income + (purchase - sale) * parseInt(primaryAsks[0].price_ujpy)) /
      ((purchase + sale) * parseInt(primaryAsks[0].price_ujpy));

    await discount_price.create(
      new DiscountPrice({ price_ujpy: price.toString(), amount_purchase_utoken: purchase.toString(), amount_sale_utoken: sale.toString() }),
    );

    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.getLatest(studentID);
      await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
    }
  });
