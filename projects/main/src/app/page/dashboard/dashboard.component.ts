import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Balance } from '@local/common';
import { MultiDataSet } from 'ng2-charts';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { InsufficientBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/insufficient-balances/insufficient-balance.application.service';
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
  totalBalance$: Observable<Balance> | undefined;
  insufficiency$: Observable<number> | undefined;
  rankings$: Observable<Ranking[]> | undefined;
  rank$: Observable<number> | undefined;
  totalUsage$: Observable<number> | undefined;
  usages$: Observable<number[]> | undefined;
  usagesPreviousYear$: Observable<number[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentsApp: StudentAccountApplicationService,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
  ) {
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
            this.dailyUsageApp.list(user.room_id).then((usages) => {
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
    this.totalBalance$ = users$.pipe(
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
    this.insufficiency$ = studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += insufficiency.amount) : count;
        }
        return count;
      }),
    );

    const usageList$ = studentAccount$.pipe(mergeMap((account) => this.dailyUsageApp.list$(account.room_id)));

    this.totalUsage$ = usageList$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          (usage.created_at as Timestamp).toDate() > firstDay ? (count += usage.amount_kwh) : count;
        }
        return count;
      }),
    );
    this.usages$ = usageList$.pipe(
      map((usages) => usages.filter((usage) => (usage.created_at as Timestamp).toDate() > firstDay).map((usage) => usage.amount_kwh)),
    );
    let lastYearFirst = new Date();
    lastYearFirst.setFullYear(lastYearFirst.getFullYear() - 1);
    lastYearFirst.setHours(0, 0, 0, 0);
    let lastYearEnd = lastYearFirst;
    lastYearEnd.setMonth(lastYearEnd.getMonth() - 1);
    this.usagesPreviousYear$ = usageList$.pipe(
      map((usages) =>
        usages
          .filter(
            (usage) => (usage.created_at as Timestamp).toDate() > lastYearFirst && (usage.created_at as Timestamp).toDate() < lastYearEnd,
          )
          .map((usage) => usage.amount_kwh),
      ),
    );
  }

  ngOnInit(): void {}
}
