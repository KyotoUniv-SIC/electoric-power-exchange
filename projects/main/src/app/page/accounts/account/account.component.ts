import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyPayment, StudentAccount } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
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
  balance$: Observable<Balance> | undefined;
  user$: Observable<User | null> | undefined;
  studentAccount$: Observable<StudentAccount> | undefined;
  balances$: Observable<Balance | null> | undefined;
  monthlyPayments$: Observable<MonthlyPayment[] | null> | undefined;
  insufficiency$: Observable<number> | undefined;
  amountUPX$: Observable<number> | undefined;
  amountSPX$: Observable<number> | undefined;
  amountInsufficiency$: Observable<number> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.balances$ = this.studentAccount$.pipe(mergeMap((account) => (!account ? of(null) : this.balanceApp.getByUid$(account.id))));
    this.monthlyPayments$ = this.studentAccount$.pipe(
      mergeMap((account) => (!account ? of(null) : this.monthlyPaymentApp.list$(account.id))),
    );
    this.amountUPX$ = combineLatest([this.balance$, this.insufficiency$]).pipe(
      map(([balance, insufficiency]) => (balance.amount_upx < insufficiency ? 0 : balance.amount_upx - insufficiency)),
    );
    this.amountSPX$ = combineLatest([this.balance$, this.insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        balance.amount_spx + balance.amount_upx < insufficiency
          ? 0
          : balance.amount_upx < insufficiency
          ? balance.amount_spx + balance.amount_upx - insufficiency
          : balance.amount_spx,
      ),
    );
    this.amountInsufficiency$ = combineLatest([this.balance$, this.insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        balance.amount_upx + balance.amount_spx < insufficiency ? insufficiency - balance.amount_upx - balance.amount_spx : 0,
      ),
    );
  }
  ngOnInit(): void {}
}
