import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { Balance, MonthlyPayment, StudentAccount } from '@local/common';
import { ChartDataSets } from 'chart.js';
import { ChartMonthlyUsageService } from 'projects/shared/src/lib/services/charts/chart-monthly-usages/chart-monthly-usage.service';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { InsufficientBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/insufficient-balances/insufficient-balance.application.service';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { MonthlyUsageApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-usages/monthly-usage.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  studentAccount$: Observable<StudentAccount> | undefined;
  balances$: Observable<Balance | null> | undefined;

  uupxAmount$: Observable<number | null> | undefined;
  uspxAmount$: Observable<number | null> | undefined;
  insufficiencyAmount$: Observable<number | null> | undefined;
  monthlyPayments$: Observable<MonthlyPayment[] | null | undefined> | undefined;

  usageData$: Observable<ChartDataSets[]> | undefined;

  constructor(
    private auth: Auth,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
    private readonly monthlyUsageApp: MonthlyUsageApplicationService,
    private readonly chartMonthlyUsage: ChartMonthlyUsageService,
  ) {
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.balances$ = this.studentAccount$.pipe(mergeMap((account) => (!account ? of(null) : this.balanceApp.getLatest$(account.id))));
    const insufficiency$ = this.studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(insufficiency.amount_utoken)) : count;
        }
        return count;
      }),
    );
    this.uupxAmount$ = combineLatest([this.balances$, insufficiency$]).pipe(
      map(([balances, insufficiency]) =>
        balances == null ? null : parseInt(balances.amount_uupx) < insufficiency ? 0 : parseInt(balances.amount_uupx) - insufficiency,
      ),
    );
    this.uspxAmount$ = combineLatest([this.balances$, insufficiency$]).pipe(
      map(([balances, insufficiency]) =>
        balances == null
          ? null
          : parseInt(balances.amount_uspx) + parseInt(balances.amount_uupx) < insufficiency
          ? 0
          : parseInt(balances.amount_uupx) < insufficiency
          ? parseInt(balances.amount_uspx) + parseInt(balances.amount_uupx) - insufficiency
          : parseInt(balances.amount_uspx),
      ),
    );
    this.insufficiencyAmount$ = combineLatest([this.balances$, insufficiency$]).pipe(
      map(([balances, insufficiency]) =>
        balances == null
          ? null
          : parseInt(balances.amount_uupx) + parseInt(balances.amount_uspx) < insufficiency
          ? insufficiency - parseInt(balances.amount_uupx) - parseInt(balances.amount_uspx)
          : 0,
      ),
    );
    this.monthlyPayments$ = this.studentAccount$.pipe(
      mergeMap((account) => (!account ? of(null) : this.monthlyPaymentApp.list$(account.id))),
      map((payments) =>
        !payments
          ? null
          : payments.slice(0, 5).sort((first, second) => {
              // 降順に並び替え
              if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
                return -1;
              } else if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
                return 1;
              } else {
                return 0;
              }
            }),
      ),
    );

    const currentUser$ = authState(this.auth);
    const studentAccount$ = currentUser$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const usageListDaily$ = studentAccount$.pipe(mergeMap((account) => this.dailyUsageApp.getRoom$(account.room_id)));
    const usageListMonthly$ = studentAccount$.pipe(mergeMap((account) => this.monthlyUsageApp.list$(account.id)));

    this.usageData$ = combineLatest([usageListDaily$, usageListMonthly$]).pipe(
      map(([dailyUsages, monthlyUsages]) => this.chartMonthlyUsage.createMonthlyUsageChartDataSets(dailyUsages, monthlyUsages)),
    );
  }
  ngOnInit(): void {}
}
