/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable camelcase */
import { admin_account } from '../admin-accounts';
import { balance_snapshot } from '../balance-snapshots';
import { balanceSnapshotOnCreate } from '../balance-snapshots/calc-monthly-usage';
import { balance } from '../balances';
import { cost_setting } from '../cost-settings';
import { daily_payment } from '../daily-payments';
import { discount_price } from '../discount-prices';
import { insufficient_balance } from '../insufficient-balances';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_bid_history } from '../normal-bid-histories';
import { primary_ask } from '../primary-asks';
import { renewable_ask_history } from '../renewable-ask-histories';
import { renewable_ranking } from '../renewable-rankings';
import { renewable_reward_setting } from '../renewable-reward-settings';
import { student_account } from '../student-accounts';
import { BalanceSnapshot, DiscountPrice, RenewableRanking } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, memory: '2GB', secrets: ['PRIV_KEY'] });
module.exports.monthlySettlement = f.pubsub
  .schedule('45 9 1 * *')
  // .schedule('20,40,50 * * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();
    let purchase = 0;
    let sale = 0;
    for (const student of students) {
      const studentID = student.id;
      const lastMonthBalance = await balance.listLatest(studentID);
      const insufficiencies = (await insufficient_balance.listLastMonth(studentID)).reduce(
        (sum, element) => sum + parseInt(element.amount_utoken),
        0,
      );
      const totalBalance = parseInt(lastMonthBalance[0].amount_uspx) + parseInt(lastMonthBalance[0].amount_uupx) - insufficiencies;
      if (totalBalance >= 0) {
        purchase += totalBalance;
      } else {
        sale += -totalBalance;
      }
    }
    const adminAccount = await admin_account.getByName('admin');
    const primaryAsks = await primary_ask.listLastMonth();
    const normalAsks = await normal_ask_history.listLastMonth(adminAccount[0].id);
    const normalBids = await normal_bid_history.listLastMonth(adminAccount[0].id);
    const renewableAsks = await renewable_ask_history.listLastMonth(adminAccount[0].id);
    let income = 0;
    for (const ask of primaryAsks) {
      income += (parseInt(ask.price_ujpy) * parseInt(ask.amount_uupx)) / 1000000;
    }
    for (const ask of normalAsks) {
      if (ask.is_accepted) {
        income += (parseInt(ask.price_ujpy) * parseInt(ask.amount_uupx)) / 1000000;
      }
    }
    for (const bid of normalBids) {
      if (bid.is_accepted) {
        income -= (parseInt(bid.price_ujpy) * parseInt(bid.amount_uupx)) / 1000000;
      }
    }
    for (const ask of renewableAsks) {
      if (ask.is_accepted) {
        income += (parseInt(ask.price_ujpy) * parseInt(ask.amount_uspx)) / 1000000;
      }
    }

    const costSetting = await cost_setting.getLatest();
    // システム運用コスト
    const cost = !costSetting ? 0 : parseInt(costSetting.system_cost_ujpy);
    // 電気料金
    const electricity = !costSetting ? 150000 * 1000000 : parseInt(costSetting.electricity_cost_ujpy);

    const rewardSetting = await renewable_reward_setting.getLatest();
    const reward =
      parseInt(rewardSetting.first_price_ujpy) + parseInt(rewardSetting.second_price_ujpy) + parseInt(rewardSetting.third_price_ujpy);

    // 0で割るのを避ける
    let price: number;
    if (purchase + sale) {
      price =
        (cost + electricity + reward - income + ((purchase - sale) * parseInt(primaryAsks[0].price_ujpy)) / 1000000) /
        (((purchase + sale) * parseInt(primaryAsks[0].price_ujpy)) / 1000000);
    } else {
      price = 0;
    }
    console.log('Discount price', price);

    await discount_price.create(
      new DiscountPrice({
        price_ujpy: Math.floor(price).toString(),
        amount_purchase_utoken: purchase.toString(),
        amount_sale_utoken: sale.toString(),
      }),
    );

    const uspxPercentages = [];
    for (const student of students) {
      const studentID = student.id;
      const dailyPayments = await daily_payment.listLastMonth(studentID);
      let mwhCount = 0;
      let uspxCount = 0;
      for (const payment of dailyPayments) {
        mwhCount += parseInt(payment.amount_mwh);
        uspxCount += parseInt(payment.amount_uspx);
      }
      // 0で割るのを避ける
      let uspxPercentage: number;
      if (mwhCount) {
        uspxPercentage = uspxCount / mwhCount;
      } else {
        uspxPercentage = 0;
      }
      uspxPercentages.push({ studentID, uspxPercentage });
    }
    const uspxSortedPercentages = uspxPercentages.sort((first, second) => second.uspxPercentage - first.uspxPercentage);
    await renewable_ranking.create(
      new RenewableRanking({
        first_student_id: uspxSortedPercentages[0].studentID,
        second_student_id: uspxSortedPercentages[1].studentID,
        third_student_id: uspxSortedPercentages[2].studentID,
      }),
    );

    // BalanceSnapshotが計算のトリガーなので分割している
    for (const student of students) {
      const studentID = student.id;
      console.log(studentID, 'payment start');
      const lastMonthBalance = await balance.listLatest(studentID);
      await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
      await balanceSnapshotOnCreate({ data: () => lastMonthBalance[0] }, null);
    }
    // await Promise.all(
    //   students.map(async (student) => {
    //     const studentID = student.id;
    //     const lastMonthBalance = await balance.listLatest(studentID);
    //     await balance_snapshot.create(new BalanceSnapshot(lastMonthBalance[0]));
    //     await balanceSnapshotOnCreate({ data: () => lastMonthBalance[0] }, null);
    //   }),
    // );
    console.log('tx end');
  });
