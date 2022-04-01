import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyPayment, StudentAccount } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { InsufficientBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/insufficient-balances/insufficient-balance.application.service';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
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

  amountUPX$: Observable<number | null> | undefined;
  amountSPX$: Observable<number | null> | undefined;
  amountInsufficiency$: Observable<number | null> | undefined;
  monthlyPayments$: Observable<MonthlyPayment[] | null> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    const now = new Date();
    let firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setHours(0, 0, 0, 0);
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const balances$ = this.studentAccount$.pipe(mergeMap((account) => (!account ? of(null) : this.balanceApp.getByUid$(account.id))));
    const insufficiency$ = this.studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += insufficiency.amount) : count;
        }
        return count;
      }),
    );
    this.amountUPX$ = combineLatest([balances$, insufficiency$]).pipe(
      map(([balances, insufficiency]) =>
        balances == null ? null : balances.amount_upx < insufficiency ? 0 : balances.amount_upx - insufficiency,
      ),
    );
    this.amountSPX$ = combineLatest([balances$, insufficiency$]).pipe(
      map(([balances, insufficiency]) =>
        balances == null
          ? null
          : balances.amount_spx + balances.amount_upx < insufficiency
          ? 0
          : balances.amount_upx < insufficiency
          ? balances.amount_spx + balances.amount_upx - insufficiency
          : balances.amount_spx,
      ),
    );
    this.amountInsufficiency$ = combineLatest([balances$, insufficiency$]).pipe(
      map(([balances, insufficiency]) =>
        balances == null
          ? null
          : balances.amount_upx + balances.amount_spx < insufficiency
          ? insufficiency - balances.amount_upx - balances.amount_spx
          : 0,
      ),
    );
    this.monthlyPayments$ = this.studentAccount$.pipe(
      mergeMap((account) => (!account ? of(null) : this.monthlyPaymentApp.list$(account.id))),
    );
  }
  ngOnInit(): void {}
}
