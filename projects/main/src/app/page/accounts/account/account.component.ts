import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyPayment } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  balances$: Observable<Balance> | undefined;
  monthlyPayments$: Observable<MonthlyPayment[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    this.user$ = authState(this.auth);
    const accountID$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.monthlyPayments$ = accountID$.pipe(mergeMap((account) => this.monthlyPaymentApp.list$(account.id)));
    // Dummy
    this.monthlyPayments$ = of([
      new MonthlyPayment({
        id: '01',
        student_account_id: 'test',
        year: 2020,
        month: 9,
        amount_jpy: 3000,
      }),
      new MonthlyPayment({
        id: '01',
        student_account_id: 'test',
        year: 2020,
        month: 10,
        amount_jpy: 2400,
      }),
      new MonthlyPayment({
        id: '01',
        student_account_id: 'test',
        year: 2020,
        month: 11,
        amount_jpy: 2700,
      }),
      new MonthlyPayment({
        id: '01',
        student_account_id: 'test',
        year: 2020,
        month: 12,
        amount_jpy: 3600,
      }),
    ]);
    this.balances$ = accountID$.pipe(mergeMap((account) => this.balanceApp.getByUid$(account.id)));
  }
  ngOnInit(): void {}
}
