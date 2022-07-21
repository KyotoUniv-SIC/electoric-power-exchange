import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import {
  Balance,
  DailyUsage,
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableRewardSetting,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import { AdminAccountApplicationService } from 'projects/shared/src/lib/services/admin-accounts/admin-account.application.service';
import { ChartBalanceService } from 'projects/shared/src/lib/services/charts/chart-balances/chart-balance.service';
import { ChartContractService } from 'projects/shared/src/lib/services/charts/chart-contracts/chart-contract.service';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { RenewableRewardSettingApplicationService } from 'projects/shared/src/lib/services/renewable-reward-settings/renewable-reward-setting.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { DailyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/daily-payments/daily-payment.application.service';
import { InsufficientBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/insufficient-balances/insufficient-balance.application.service';
import { MonthlyUsageApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-usages/monthly-usage.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export interface Ranking {
  id: string;
  rank: number;
  name: string;
  kwhAmount: number;
}
export interface CO2Ranking {
  rank: number;
  uspxPercentage: number;
}
export interface LastMonthData {
  usage: number;
  emission: number;
}
export interface LastMonthDataSource {
  classification: string;
  yourAccount: number | undefined;
  average: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  balanceData$: Observable<MultiDataSet> | undefined;
  totalBalanceData$: Observable<MultiDataSet> | undefined;
  uupxAmount$: Observable<number> | undefined;
  uspxAmount$: Observable<number> | undefined;
  insufficiencyAmount$: Observable<number> | undefined;
  latestUsage$: Observable<DailyUsage> | undefined;
  withdrawDate$: Observable<Date> | undefined;
  totalUsage$: Observable<number> | undefined;
  totalUsageAverage$: Observable<string> | undefined;
  rankings$: Observable<Ranking[]> | undefined;
  rank$: Observable<number | undefined> | undefined;
  co2Rank$: Observable<CO2Ranking> | undefined;
  renewableRewardSetting$: Observable<RenewableRewardSetting>;

  normalSettlement$: Observable<SinglePriceNormalSettlement> | undefined;
  normalDate$: Observable<Date> | undefined;
  normalChartDataSets$: Observable<ChartDataSets[]> | undefined;
  normalChartDates$: Observable<string[]> | undefined;
  normalChartOptions$: Observable<ChartOptions> | undefined;

  renewableSettlement$: Observable<SinglePriceRenewableSettlement> | undefined;
  renewableDate$: Observable<Date> | undefined;
  renewableChartDataSets$: Observable<ChartDataSets[]> | undefined;
  renewableChartDates$: Observable<string[]> | undefined;
  renewableChartOptions$: Observable<ChartOptions> | undefined;

  normalOperationBids$: Observable<NormalBid[]> | undefined;
  normalOperationAsks$: Observable<NormalAsk[]> | undefined;
  renewableOperationAsks$: Observable<RenewableAsk[]> | undefined;

  warning$: Observable<boolean>;

  lastMonthAveData$: Observable<LastMonthData> | undefined;
  lastMonthData$: Observable<LastMonthData | undefined> | undefined;

  lastMonthDataSource$: Observable<LastMonthDataSource[]> | undefined;

  constructor(
    private auth: Auth,
    private readonly studentsApp: StudentAccountApplicationService,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly monthlyUsageApp: MonthlyUsageApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly adminApp: AdminAccountApplicationService,
    private readonly dailyPaymentApp: DailyPaymentApplicationService,
    private readonly renewableRewardSettingApp: RenewableRewardSettingApplicationService,
    private readonly chartBalanceApp: ChartBalanceService,
    private readonly chartContractApp: ChartContractService,
  ) {
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    const currentUser$ = authState(this.auth);
    const studentAccount$ = currentUser$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const users$ = this.studentsApp.list$();

    // 1.Account Balance
    const balance$ = studentAccount$.pipe(mergeMap((account) => this.balanceApp.getLatest$(account.id)));
    this.balanceData$ = balance$.pipe(map((balance) => this.chartBalanceApp.createBalanceDonutChartData(balance)));
    const totalBalance$ = users$.pipe(
      mergeMap((users) => Promise.all(users.map((user) => this.balanceApp.list(user.id).then((balances) => balances[0])))),
      map((balances) => {
        let upxTotal = 0;
        let spxTotal = 0;
        balances.map((balance) => {
          upxTotal += parseInt(balance.amount_uupx);
          spxTotal += parseInt(balance.amount_uspx);
        });
        return new Balance({ amount_uupx: upxTotal.toString(), amount_uspx: spxTotal.toString() });
      }),
    );
    this.totalBalanceData$ = totalBalance$.pipe(map((balance) => this.chartBalanceApp.createBalanceDonutChartData(balance)));
    const insufficiency$ = studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(insufficiency.amount_utoken)) : count;
        }
        return count;
      }),
    );
    this.uupxAmount$ = combineLatest([balance$, insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        parseInt(balance.amount_uupx) < insufficiency ? 0 : parseInt(balance.amount_uupx) - insufficiency,
      ),
    );
    this.uspxAmount$ = combineLatest([balance$, insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        parseInt(balance.amount_uspx) + parseInt(balance.amount_uupx) < insufficiency
          ? 0
          : parseInt(balance.amount_uupx) < insufficiency
          ? parseInt(balance.amount_uspx) + parseInt(balance.amount_uupx) - insufficiency
          : parseInt(balance.amount_uspx),
      ),
    );
    this.insufficiencyAmount$ = combineLatest([balance$, insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        parseInt(balance.amount_uupx) + parseInt(balance.amount_uspx) < insufficiency
          ? insufficiency - parseInt(balance.amount_uupx) - parseInt(balance.amount_uspx)
          : 0,
      ),
    );

    // 2.Latest Contract Price
    this.normalSettlement$ = this.singlePriceNormalApp.getLatest$();
    this.normalDate$ = this.normalSettlement$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.renewableSettlement$ = this.singlePriceRenewableApp.getLatest$();
    this.renewableDate$ = this.renewableSettlement$.pipe(map((single) => (single.market_date as Timestamp).toDate()));

    // 3.Contract Price & Amount Charts (4.は無し)
    const normalSettlements$ = this.singlePriceNormalApp.list$();
    const renewableSettlements$ = this.singlePriceRenewableApp.list$();

    this.normalChartDataSets$ = normalSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDataSets(settlements)),
    );

    this.normalChartDates$ = normalSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDatesLabel(settlements)),
    );

    this.normalChartOptions$ = normalSettlements$.pipe(map((settlements) => this.chartContractApp.createContractChartOption(settlements)));

    this.renewableChartDataSets$ = renewableSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDataSets(settlements)),
    );

    this.renewableChartDates$ = renewableSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDatesLabel(settlements)),
    );

    this.renewableChartOptions$ = renewableSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartOption(settlements)),
    );

    // 5.System Operation Status
    const adminAccounts$ = this.adminApp.getByName$('admin');
    this.normalOperationBids$ = adminAccounts$.pipe(mergeMap((adminAccount) => this.normalBidApp.listUid$(adminAccount[0].id)));
    this.normalOperationAsks$ = adminAccounts$.pipe(mergeMap((adminAccount) => this.normalAskApp.listUid$(adminAccount[0].id)));
    this.renewableOperationAsks$ = adminAccounts$.pipe(mergeMap((adminAccount) => this.renewableAskApp.listUid$(adminAccount[0].id)));

    // 6.Next Withdrawal
    const usageListDaily$ = studentAccount$.pipe(mergeMap((account) => this.dailyUsageApp.getRoom$(account.room_id)));
    const usageListDailyTotal$ = this.dailyUsageApp.list$();
    const usageListMonthly$ = studentAccount$.pipe(mergeMap((account) => this.monthlyUsageApp.list$(account.id)));
    this.latestUsage$ = usageListDaily$.pipe(
      map(
        (usages) =>
          usages.sort((first, second) => {
            // 降順に並び替え
            if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return -1;
            } else if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return 1;
            } else {
              return 0;
            }
          })[0],
      ),
    );
    this.withdrawDate$ = this.latestUsage$.pipe(
      map((usage) => {
        const createdAt = (usage.created_at as Timestamp).toDate();
        createdAt.setDate(createdAt.getDate() + 1);
        return createdAt;
      }),
    );

    // 7.ランキング表示
    this.rankings$ = users$.pipe(
      mergeMap((users) =>
        Promise.all(
          users.map((user) =>
            this.dailyUsageApp.getRoom(user.room_id).then((usages) => {
              let count = 0;
              for (const usage of usages) {
                (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh_str)) : count;
              }
              return { id: user.id, name: user.name, kwhAmount: count };
            }),
          ),
        ),
      ),
      // mapはforEachの機能に加えて新しい配列を返します（forEachは何も返さず、必ずvoidになる）
      map((rankings) => {
        let count = 1;
        let tmp = 0;
        // ここでランキングをソートして、順位をrankに入れる
        let sortedRanking = rankings
          .sort((first, second) => second.kwhAmount - first.kwhAmount)
          .map((item, index) => {
            if (item.kwhAmount !== tmp) {
              count = index + 1;
              tmp = item.kwhAmount;
            }
            // ここのreturnは86行目{}を受けてreturnしてます (85行目Array.map()の返り値)
            return { id: item.id, rank: count, name: item.name, kwhAmount: item.kwhAmount };
          });
        //  ここのreturnは79行目{}を受けてreturnしてます (79行目Observable.map()の返り値)
        return sortedRanking;
      }),
    );
    this.rank$ = combineLatest([this.rankings$, studentAccount$]).pipe(
      map(([rankings, account]) => rankings.find((ranking) => ranking.id == account.id)?.rank),
    );

    const co2Rankings$ = users$.pipe(
      mergeMap((users) =>
        Promise.all(
          users.map((user) =>
            this.dailyPaymentApp.list(user.id).then((payments) => {
              let mwhCount = 0;
              let uspxCount = 0;
              for (const payment of payments) {
                if ((payment.created_at as Timestamp).toDate() > firstDay) {
                  mwhCount += parseInt(payment.amount_mwh);
                  uspxCount += parseInt(payment.amount_uspx);
                }
              }
              return { id: user.id, name: user.name, mwhAmount: mwhCount, uspxAmount: uspxCount };
            }),
          ),
        ),
      ),
      map((co2Rankings) => {
        let count = 1;
        let tmp = 0;
        let sortedCo2Ranking = co2Rankings
          .sort((first, second) => second.uspxAmount / second.mwhAmount - first.uspxAmount / first.mwhAmount)
          .map((item, index) => {
            if (item.uspxAmount / item.mwhAmount != tmp) {
              count = index + 1;
              tmp = item.uspxAmount / item.mwhAmount;
            }
            return { id: item.id, rank: count, name: item.name, mwhAmount: item.mwhAmount, uspxAmount: item.uspxAmount };
          });
        return sortedCo2Ranking;
      }),
    );
    this.co2Rank$ = combineLatest([co2Rankings$, studentAccount$]).pipe(
      map(([rankings, account]) => {
        const ranking = rankings.find((ranking) => ranking.id == account.id);
        return { rank: ranking?.rank!, uspxPercentage: ranking?.uspxAmount! / ranking?.mwhAmount! };
      }),
    );

    this.renewableRewardSetting$ = this.renewableRewardSettingApp.getLatest$();

    // 8.This Month's Usage
    this.totalUsage$ = usageListDaily$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh_str)) : count;
        }
        return count;
      }),
    );

    this.totalUsageAverage$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh_str)) : count;
        }
        // higashi-20, koushi-26, sentetsu-28
        return (count / (20 + 26 + 28)).toFixed(2);
      }),
    );

    const latestMonthlyUsage = usageListMonthly$.pipe(
      map(
        (usages) =>
          usages.sort((first, second) => {
            // 降順に並び替え
            if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return -1;
            } else if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return 1;
            } else {
              return 0;
            }
          })[0],
      ),
    );

    this.warning$ = combineLatest([this.totalUsage$, latestMonthlyUsage]).pipe(
      map(([totalUsage, latestMonthlyUsage]) => {
        if (totalUsage > Number(latestMonthlyUsage.amount_mwh)) {
          return true;
        } else {
          return false;
        }
      }),
    );

    //  9.LastMonth's Usage & CO2 Emission
    const lastMonthPayments$ = users$.pipe(
      mergeMap(async (users) => {
        let payments = [];
        for (const user of users) {
          const dailyPayments = await this.dailyPaymentApp.list(user.id);
          const usageSum = dailyPayments.reduce((prev, current) => prev + parseInt(current.amount_mwh), 0);
          const uspxSum = dailyPayments.reduce((prev, current) => prev + parseInt(current.amount_uspx), 0);
          payments.push({ id: user.id, mwhUsage: usageSum, uspxAmount: uspxSum });
        }
        return payments;
      }),
    );

    const emissionRate = 540; //1kwhあたりのCO2排出量

    this.lastMonthAveData$ = lastMonthPayments$.pipe(
      map((payments) => {
        const usageAverage = payments.reduce((prev, current) => prev + current.mwhUsage, 0) / payments.length;
        const emissionAverage =
          (payments.reduce((prev, current) => prev + current.mwhUsage - current.uspxAmount, 0) / payments.length) * emissionRate;

        return { usage: usageAverage, emission: emissionAverage };
      }),
    );

    this.lastMonthData$ = combineLatest([studentAccount$, lastMonthPayments$]).pipe(
      map(([studentAccount, payments]) => {
        const accountPayment = payments.find((payment) => (payment.id = studentAccount.id));
        if (!accountPayment) {
          return undefined;
        }
        const emission = (accountPayment?.mwhUsage - accountPayment?.uspxAmount) * emissionRate;
        return { usage: accountPayment.mwhUsage, emission };
      }),
    );

    this.lastMonthDataSource$ = combineLatest([this.lastMonthData$, this.lastMonthAveData$]).pipe(
      map(([data, aveData]) => [
        {
          classification: 'Electricity (kWh)',
          yourAccount: Math.floor((data?.usage! / 1000000) * 10) / 10, //小数点第2位切り捨て
          average: Math.floor((aveData.usage! / 1000000) * 10) / 10,
        },
        {
          classification: 'CO2 Emission (kg)',
          yourAccount: Math.floor((data?.emission! / (1000 * 100000)) * 10) / 10, //gをkgにしたのち小数点第2位切り捨て
          average: Math.floor((aveData.emission! / (1000 * 1000000)) * 10) / 10,
        },
      ]),
    );
  }

  ngOnInit(): void {}
}
