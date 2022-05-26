import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyUsage, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
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
                (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh)) : count;
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
    this.balanceData$ = balance$.pipe(map((balance) => [[parseInt(balance.amount_uupx), parseInt(balance.amount_uspx)]]));
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
    this.totalBalanceData$ = totalBalance$.pipe(map((balance) => [[parseInt(balance.amount_uupx), parseInt(balance.amount_uspx)]]));
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
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh)) : count;
        }
        return count;
      }),
    );

    this.totalUsageAverage$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh)) : count;
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
        data.push(new MonthlyUsage({ amount_mwh: totalUsage.toString() }));
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
    this.singlePriceNormal$ = this.singlePriceNormalApp.getLatest$();
    this.singlePriceNormalDate$ = this.singlePriceNormal$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.singlePriceRenewable$ = this.singlePriceRenewableApp.getLatest$();
    this.singlePriceRenewableDate$ = this.singlePriceRenewable$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
