import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Balance, DailyUsage, MonthlyUsage, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartDataSets } from 'chart.js';
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
  name: string;
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  balance$: Observable<Balance> | undefined;
  balanceData$: Observable<MultiDataSet> | undefined;
  totalBalanceData$: Observable<MultiDataSet> | undefined;
  insufficiency$: Observable<number> | undefined;
  totalUsage$: Observable<number> | undefined;
  totalUsageAverage$: Observable<string> | undefined;
  usageData$: Observable<ChartDataSets[]> | undefined;
  rankings$: Observable<Ranking[]> | undefined;
  rank$: Observable<number> | undefined;
  singlePriceNormal$: Observable<SinglePriceNormalSettlement> | undefined;
  singlePriceNormalDate$: Observable<Date> | undefined;
  singlePriceRenewable$: Observable<SinglePriceRenewableSettlement> | undefined;
  singlePriceRenewableDate$: Observable<Date> | undefined;

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
                (usage.created_at as Timestamp).toDate() > firstDay ? (count += usage.amount_kwh) : count;
              }
              return { id: user.id, name: user.name, amount: count };
            }),
          ),
        ),
      ),
      map((rankings) => rankings.sort((first, second) => second.amount - first.amount)),
    );
    this.rank$ = combineLatest([this.rankings$, studentAccount$]).pipe(
      map(([rankings, account]) => rankings.findIndex((ranking) => ranking.id == account.id) + 1),
    );
    this.balance$ = studentAccount$.pipe(mergeMap((account) => this.balanceApp.getByUid$(account.id)));
    this.balanceData$ = this.balance$.pipe(map((balance) => [[balance.amount_upx, balance.amount_spx]]));
    const totalBalance$ = users$.pipe(
      mergeMap((users) => Promise.all(users.map((user) => this.balanceApp.list(user.id).then((balances) => balances[0])))),
      map((balances) => {
        let upxTotal = 0;
        let spxTotal = 0;
        balances.map((balance) => {
          upxTotal += balance.amount_upx;
          spxTotal += balance.amount_spx;
        });
        return new Balance({ amount_upx: upxTotal, amount_spx: spxTotal });
      }),
    );
    this.totalBalanceData$ = totalBalance$.pipe(map((balance) => [[balance.amount_upx, balance.amount_spx]]));
    this.insufficiency$ = studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += insufficiency.amount) : count;
        }
        return count;
      }),
    );

    const usageListDaily$ = studentAccount$.pipe(mergeMap((account) => this.dailyUsageApp.getRoom$(account.room_id)));
    const usageListDailyTotal$ = this.dailyUsageApp.list$();
    const usageListMonthly$ = studentAccount$.pipe(mergeMap((account) => this.monthlyUsageApp.list$(account.id)));

    this.totalUsage$ = usageListDaily$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += usage.amount_kwh) : count;
        }
        return count;
      }),
    );

    this.totalUsageAverage$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += usage.amount_kwh) : count;
        }
        return (count / (20 + 26 + 28)).toFixed(2);
      }),
    );

    const beggingThisYear = new Date(now.getFullYear(), 0, 1);
    const usages$ = combineLatest([this.totalUsage$, usageListMonthly$]).pipe(
      map(([totalUsage, monthlyUsages]) => {
        let data = monthlyUsages
          .filter((usage) => (usage.created_at as Timestamp).toDate() > beggingThisYear)
          .sort(function (first, second) {
            if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return -1;
            } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return 1;
            } else {
              return 0;
            }
          });

        // .getMonth() 与えた日付の「月」を表す 0 から 11 までの間の整数値
        let lackBefore = !data.length ? now.getMonth() : (data[0].created_at as Timestamp).toDate().getMonth();
        let lackAfter = !data.length ? 11 - now.getMonth() : 10 - (data[data.length - 1].created_at as Timestamp).toDate().getMonth();
        // 前月以前のデータに0を入れる
        for (let i = 0; i < lackBefore; i++) {
          data.unshift(new MonthlyUsage({ amount_kwh: 0 }));
        }
        // 今月のデータを追加
        data.push(new MonthlyUsage({ amount_kwh: totalUsage }));
        // 来月以降のデータに0を入れる
        for (let i = 0; i < lackAfter; i++) {
          data.push(new MonthlyUsage({ amount_kwh: 0 }));
        }
        return data.map((usage) => usage.amount_kwh);
      }),
    );

    const beginningPreviousYear = new Date(now.getFullYear() - 1, 0, 1);
    const usagesPreviousYear$ = usageListMonthly$.pipe(
      map((usages) => {
        let data = usages
          .filter(
            (usage) =>
              (usage.created_at as Timestamp).toDate() > beginningPreviousYear &&
              (usage.created_at as Timestamp).toDate() < beggingThisYear,
          )
          .sort(function (first, second) {
            if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return -1;
            } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((usage) => usage.amount_kwh);
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
    this.singlePriceNormal$ = this.singlePriceNormalApp.getLatest$();
    this.singlePriceNormalDate$ = this.singlePriceNormal$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.singlePriceRenewable$ = this.singlePriceRenewableApp.getLatest$();
    this.singlePriceRenewableDate$ = this.singlePriceRenewable$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
