import { Component, OnInit } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyPayment } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User | undefined;
  balances$: Observable<Balance> | undefined;
  monthlyPayments$: Observable<MonthlyPayment[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    const auth = getAuth();
    if (auth.currentUser !== null) {
      this.user = auth.currentUser;
    }
    const uid = auth.currentUser?.uid;
    if (!uid) {
      return;
    }
    const accountID$ = this.studentAccApp.getByUid$(uid);
    this.monthlyPayments$ = accountID$.pipe(mergeMap((account) => this.monthlyPaymentApp.list$(account.id)));
    this.balances$ = accountID$.pipe(mergeMap((account) => this.balanceApp.getByUid$(account.id)));
  }
  ngOnInit(): void {}
}
