import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Balance } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/student-accounts/daily-usages/daily-usage.application.service';
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
  balances$: Observable<Balance> | undefined;
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
  ) {
    const currentUser$ = authState(this.auth);
    const studentAccount$ = currentUser$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const users$ = this.studentsApp.list$();
    this.rankings$ = users$.pipe(
      mergeMap((users) =>
        Promise.all(
          users.map((user) =>
            this.dailyUsageApp.list(user.id).then((usages) => {
              let count = 0;
              for (const usage of usages) {
                if ((usage.created_at as Timestamp).toDate() > first) {
                  count += usage.amount_kwh;
                }
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
    this.rank$.subscribe((a) => console.log(a));
    this.balances$ = studentAccount$.pipe(mergeMap((account) => this.balanceApp.getByUid$(account.id)));

    const usageList$ = studentAccount$.pipe(mergeMap((account) => this.dailyUsageApp.list$(account.id)));
    let first = new Date();
    first.setDate(1);
    first.setHours(0, 0, 0, 0);
    this.totalUsage$ = usageList$.pipe(
      map((usages) => {
        let count = 0;
        for (const usage of usages) {
          if ((usage.created_at as Timestamp).toDate() > first) {
            count += usage.amount_kwh;
          }
        }
        return count;
      }),
    );
    this.usages$ = usageList$.pipe(
      map((usages) => usages.filter((usage) => (usage.created_at as Timestamp).toDate() > first).map((usage) => usage.amount_kwh)),
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
