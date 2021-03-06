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
  normalSettlements$: Observable<SinglePriceNormalSettlement[]> | undefined;
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
  ) {
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    const currentUser$ = authState(this.auth);
    const studentAccount$ = currentUser$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const users$ = this.studentsApp.list$();

    // 1.Account Balance
    const balance$ = studentAccount$.pipe(mergeMap((account) => this.balanceApp.getLatest$(account.id)));
    this.balanceData$ = balance$.pipe(
      map((balance) => [[parseInt(balance.amount_uupx) / 1000000, parseInt(balance.amount_uspx) / 1000000]]),
    );
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
    this.totalBalanceData$ = totalBalance$.pipe(
      map((balance) => [[parseInt(balance.amount_uupx) / 1000000, parseInt(balance.amount_uspx) / 1000000]]),
    );
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
    this.normalSettlements$ = this.singlePriceNormalApp.listLatestMonth$();
    const renewableSettlements$ = this.singlePriceRenewableApp.listLatestMonth$();

    // 3.Contract Price & Amount Charts (4.?????????)
    const pricesNormal$ = this.normalSettlements$.pipe(map((params) => params.map((param) => parseInt(param.price_ujpy) / 1000000)));
    const amountsNormal$ = this.normalSettlements$.pipe(map((params) => params.map((param) => parseInt(param.amount_uupx) / 1000000)));
    const pricesRenewable$ = renewableSettlements$.pipe(map((params) => params.map((param) => parseInt(param.price_ujpy) / 1000000)));
    const amountsRenewable$ = renewableSettlements$.pipe(map((params) => params.map((param) => parseInt(param.amount_uspx) / 1000000)));
    const referencePriceNormal$ = pricesNormal$.pipe(map((params) => Array(params.length).fill(27 as number)));
    const referencePriceRenewable$ = pricesRenewable$.pipe(map((params) => Array(params.length).fill(27 as number)));

    this.normalChartDataSets$ = combineLatest([pricesNormal$, amountsNormal$, referencePriceNormal$]).pipe(
      map(([prices, amounts, references]) => [
        {
          data: references,
          label: 'Reference Price',
          borderDash: [5, 3], //??????
          fill: 'false', //???????????????
          type: 'line',
          tension: 0,
          yAxisID: 'y-axis-price',
        },
        {
          data: prices,
          label: 'Contract Price',
          fill: 'false',
          type: 'line',
          tension: 0,
          yAxisID: 'y-axis-price',
        },
        { data: amounts, label: 'Contract Amount', type: 'bar', yAxisID: 'y-axis-amount' },
      ]),
    );

    this.normalChartDates$ = this.normalSettlements$.pipe(
      map((params) =>
        params.map(
          (param) => (param.created_at as Timestamp).toDate().getMonth() + 1 + '/' + (param.created_at as Timestamp).toDate().getDate(),
        ),
      ),
    );

    this.renewableChartDataSets$ = combineLatest([pricesRenewable$, amountsRenewable$, referencePriceRenewable$]).pipe(
      map(([prices, amounts, references]) => [
        {
          data: references,
          label: 'Reference Price',
          borderDash: [5, 3],
          fill: 'false',
          type: 'line',
          tension: 0,
          yAxisID: 'y-axis-price',
        },
        { data: prices, label: 'Contract Price', fill: '', type: 'line', tension: 0, yAxisID: 'y-axis-price' },
        { data: amounts, label: 'Contract Amount', yAxisID: 'y-axis-amount' },
      ]),
    );

    this.renewableChartDates$ = renewableSettlements$.pipe(
      map((params) =>
        params.map(
          (param) => (param.created_at as Timestamp).toDate().getMonth() + 1 + '/' + (param.created_at as Timestamp).toDate().getDate(),
        ),
      ),
    );

    const maxPriceNormal$ = pricesNormal$.pipe(map((pricesNormal) => pricesNormal.reduce((a, b) => Math.max(a, b))));
    const minPriceNormal$ = pricesNormal$.pipe(map((pricesNormal) => pricesNormal.reduce((a, b) => Math.min(a, b))));
    const maxAmountNormal$ = amountsNormal$.pipe(map((amountsNormal) => amountsNormal.reduce((a, b) => Math.max(a, b))));
    const minAmountNormal$ = amountsNormal$.pipe(map((amountsNormal) => amountsNormal.reduce((a, b) => Math.min(a, b))));

    const maxPriceRenewable$ = pricesRenewable$.pipe(map((pricesRenewable) => pricesRenewable.reduce((a, b) => Math.max(a, b))));
    const minPriceRenewable$ = pricesRenewable$.pipe(map((pricesRenewable) => pricesRenewable.reduce((a, b) => Math.min(a, b))));
    const maxAmountRenewable$ = amountsRenewable$.pipe(map((amountsRenewable) => amountsRenewable.reduce((a, b) => Math.max(a, b))));
    const minAmountRenewable$ = amountsRenewable$.pipe(map((amountsRenewable) => amountsRenewable.reduce((a, b) => Math.min(a, b))));

    this.normalChartOptions$ = combineLatest([maxPriceNormal$, minPriceNormal$, maxAmountNormal$, minAmountNormal$]).pipe(
      map(([maxPriceNormal, minPriceNormal, maxAmountNormal, minAmountNormal]) => {
        return {
          responsive: true,
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [
              {
                id: 'y-axis-price', // Y??????ID
                scaleLabel: {
                  display: true, // ??????
                  labelString: 'JPY', // ????????????
                },
                type: 'linear', // linear??????
                position: 'left', // ???????????????????????????????????????
                ticks: {
                  // ????????????
                  max: maxPriceNormal + 5,
                  min: Math.max(minPriceNormal - 5, 0),
                  stepSize: 10,
                },
              },
              {
                id: 'y-axis-amount',
                scaleLabel: {
                  display: true,
                  labelString: 'UPX Amount',
                },
                type: 'linear',
                position: 'right',
                ticks: {
                  max: maxAmountNormal + 5,
                  min: Math.max(minAmountNormal - 5, 0),
                  stepSize: 10,
                },
                gridLines: {
                  // 2?????????????????????????????????
                  drawOnChartArea: false,
                },
              },
            ],
          },
        };
      }),
    );

    this.renewableChartOptions$ = combineLatest([maxPriceRenewable$, minPriceRenewable$, maxAmountRenewable$, minAmountRenewable$]).pipe(
      map(([maxPriceRenewable, minPriceRenewable, maxAmountRenewable, minAmountRenewable]) => {
        return {
          responsive: true,
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [
              {
                id: 'y-axis-price', // Y??????ID
                scaleLabel: {
                  display: true, // ??????
                  labelString: 'JPY', // ????????????
                },
                type: 'linear', // linear??????
                position: 'left', // ???????????????????????????????????????
                ticks: {
                  // ????????????
                  max: maxPriceRenewable + 5,
                  min: Math.max(minPriceRenewable - 5, 0),
                  stepSize: 10,
                },
              },
              {
                id: 'y-axis-amount',
                scaleLabel: {
                  display: true,
                  labelString: 'SPX Amount',
                },
                type: 'linear',
                position: 'right',
                ticks: {
                  max: maxAmountRenewable + 5,
                  min: Math.max(minAmountRenewable - 5, 0),
                  stepSize: 10,
                },
                gridLines: {
                  // 2?????????????????????????????????
                  drawOnChartArea: false,
                },
              },
            ],
          },
        };
      }),
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
            // ?????????????????????
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

    // 7.?????????????????????
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
      // map???forEach??????????????????????????????????????????????????????forEach???????????????????????????void????????????
      map((rankings) => {
        let count = 1;
        let tmp = 0;
        // ??????????????????????????????????????????????????????rank????????????
        let sortedRanking = rankings
          .sort((first, second) => second.kwhAmount - first.kwhAmount)
          .map((item, index) => {
            if (item.kwhAmount !== tmp) {
              count = index + 1;
              tmp = item.kwhAmount;
            }
            // ?????????return???86??????{}????????????return???????????? (85??????Array.map()????????????)
            return { id: item.id, rank: count, name: item.name, kwhAmount: item.kwhAmount };
          });
        //  ?????????return???79??????{}????????????return???????????? (79??????Observable.map()????????????)
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
            // ?????????????????????
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

    const emissionRate = 540; //1kwh????????????CO2?????????

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
          yourAccount: Math.floor((data?.usage! / 1000000) * 10) / 10, //????????????2???????????????
          average: Math.floor((aveData.usage! / 1000000) * 10) / 10,
        },
        {
          classification: 'CO2 Emission (kg)',
          yourAccount: Math.floor((data?.emission! / (1000 * 100000)) * 10) / 10, //g???kg???????????????????????????2???????????????
          average: Math.floor((aveData.emission! / (1000 * 1000000)) * 10) / 10,
        },
      ]),
    );
  }

  ngOnInit(): void {}
}
