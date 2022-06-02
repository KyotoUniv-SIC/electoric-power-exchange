import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyUsage, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
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
  totalUsage$: Observable<number> | undefined;
  totalUsageAverage$: Observable<string> | undefined;
  usageData$: Observable<ChartDataSets[]> | undefined;
  rankings$: Observable<Ranking[]> | undefined;
  rank$: Observable<number | undefined> | undefined;

  normalSettlement$: Observable<SinglePriceNormalSettlement> | undefined;
  normalDate$: Observable<Date> | undefined;
  normalSettlements$: Observable<SinglePriceNormalSettlement[]> | undefined;
  normalChartDataSets$: Observable<ChartDataSets[]> | undefined;
  normalChartDates$: Observable<string[]> | undefined;
  normalChartOptions$: Observable<ChartOptions> | undefined;

  renewableSettlement$: Observable<SinglePriceRenewableSettlement> | undefined;
  renewableDate$: Observable<Date> | undefined;
  renewableSettlements$: Observable<SinglePriceRenewableSettlement[]> | undefined;
  renewableChartDataSets$: Observable<ChartDataSets[]> | undefined;
  renewableChartDates$: Observable<string[]> | undefined;
  renewableChartOptions$: Observable<ChartOptions> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentsApp: StudentAccountApplicationService,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly monthlyUsageApp: MonthlyUsageApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
  ) {
    const now = new Date();
    let firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setHours(0, 0, 0, 0);
    const currentUser$ = authState(this.auth);
    const studentAccount$ = currentUser$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const users$ = this.studentsApp.list$();
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
        let count = 0;
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
    const balance$ = studentAccount$.pipe(mergeMap((account) => this.balanceApp.getByUid$(account.id)));
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

    const usageListDaily$ = studentAccount$.pipe(mergeMap((account) => this.dailyUsageApp.getRoom$(account.room_id)));
    const usageListDailyTotal$ = this.dailyUsageApp.list$();
    const usageListMonthly$ = studentAccount$.pipe(mergeMap((account) => this.monthlyUsageApp.list$(account.id)));

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

    const usages$ = combineLatest([this.totalUsage$, usageListMonthly$]).pipe(
      map(([totalUsage, monthlyUsages]) => {
        let data = monthlyUsages
          .filter((usage) => parseInt(usage.year) == now.getFullYear())
          .sort((first, second) => parseInt(first.month) - parseInt(second.month));

        // .getMonth() 与えた日付の「月」を表す 0 から 11 までの間の整数値
        let lackBefore = !data.length ? now.getMonth() : parseInt(data[0].month) - 1;
        let lackAfter = !data.length ? 11 - now.getMonth() : 12 - parseInt(data[data.length - 1].month);
        // 前月以前のデータに0を入れる
        for (let i = 0; i < lackBefore; i++) {
          data.unshift(new MonthlyUsage({ amount_mwh: '0' }));
        }
        // 今月のデータを追加
        data.push(new MonthlyUsage({ amount_mwh: (totalUsage * 1000000).toString() }));
        // 来月以降のデータに0を入れる
        for (let i = 0; i < lackAfter; i++) {
          data.push(new MonthlyUsage({ amount_mwh: '0' }));
        }
        return data.map((usage) => parseInt(usage.amount_mwh) / 1000000);
      }),
    );

    const usagesPreviousYear$ = usageListMonthly$.pipe(
      map((usages) => {
        let data = usages
          .filter((usage) => parseInt(usage.year) == now.getFullYear() - 1)
          .sort((first, second) => parseInt(first.month) - parseInt(second.month))
          .map((usage) => parseInt(usage.amount_mwh) / 1000000);
        let lack = 12 - data.length;
        for (let i = 0; i < lack; i++) {
          data.unshift(0);
        }
        return data;
      }),
    );
    this.usageData$ = combineLatest([usages$, usagesPreviousYear$]).pipe(
      map(([thisYear, lastYear]) => [
        { data: thisYear, label: 'This year' },
        { data: lastYear, label: 'Last year' },
      ]),
    );
    this.normalSettlement$ = this.singlePriceNormalApp.getLatest$();
    this.normalDate$ = this.normalSettlement$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.renewableSettlement$ = this.singlePriceRenewableApp.getLatest$();
    this.renewableDate$ = this.renewableSettlement$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.normalSettlements$ = this.singlePriceNormalApp.listLatestMonth$();
    this.renewableSettlements$ = this.singlePriceRenewableApp.listLatestMonth$();

    const pricesNormal$ = this.normalSettlements$.pipe(map((params) => params.map((param) => parseInt(param.price_ujpy) / 1000000)));
    const amountsNormal$ = this.normalSettlements$.pipe(map((params) => params.map((param) => parseInt(param.amount_uupx) / 1000000)));
    const pricesRenewable$ = this.renewableSettlements$.pipe(map((params) => params.map((param) => parseInt(param.price_ujpy) / 1000000)));
    const amountsRenewable$ = this.renewableSettlements$.pipe(
      map((params) => params.map((param) => parseInt(param.amount_uspx) / 1000000)),
    );
    const referencePriceNormal$ = pricesNormal$.pipe(map((params) => Array(params.length).fill(27 as number)));
    const referencePriceRenewable$ = pricesRenewable$.pipe(map((params) => Array(params.length).fill(27 as number)));

    this.normalChartDataSets$ = combineLatest([pricesNormal$, amountsNormal$, referencePriceNormal$]).pipe(
      map(([prices, amounts, references]) => [
        { data: prices, label: 'Contract Price', fill: 'false', type: 'line', yAxisID: 'y-axis-price' },
        { data: amounts, label: 'Contract Amount', type: 'bar', yAxisID: 'y-axis-amount' },
        {
          data: references,
          label: 'Reference Price',
          borderDash: [5, 3], //点線
          fill: 'false', //塗りつぶし
          type: 'line',
          yAxisID: 'y-axis-price',
        },
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
        { data: prices, label: 'Contract Price', fill: '', type: 'line', yAxisID: 'y-axis-price' },
        { data: amounts, label: 'Contract Amount', yAxisID: 'y-axis-amount' },
        {
          data: references,
          label: 'Reference Price',
          borderDash: [5, 3],
          fill: 'false',
          type: 'line',
          yAxisID: 'y-axis-price',
        },
      ]),
    );

    this.renewableChartDates$ = this.renewableSettlements$.pipe(
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
                id: 'y-axis-price', // Y軸のID
                scaleLabel: {
                  display: true, // 必須
                  labelString: 'JPY', // 軸ラベル
                },
                type: 'linear', // linear固定
                position: 'left', // どちら側に表示される軸か？
                ticks: {
                  // スケール
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
                  // 2つ目の軸のグリッド削除
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
                id: 'y-axis-price', // Y軸のID
                scaleLabel: {
                  display: true, // 必須
                  labelString: 'JPY', // 軸ラベル
                },
                type: 'linear', // linear固定
                position: 'left', // どちら側に表示される軸か？
                ticks: {
                  // スケール
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
                  // 2つ目の軸のグリッド削除
                  drawOnChartArea: false,
                },
              },
            ],
          },
        };
      }),
    );
  }

  ngOnInit(): void {}
}
