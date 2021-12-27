import { Component, OnInit } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Balance, MonthlyPayment } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { Observable } from 'rxjs';

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
    private readonly balanceApp: BalanceApplicationService,
    private readonly MonthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    const auth = getAuth();
    if (auth.currentUser !== null) {
      this.user = auth.currentUser;
    }
    const accountID = auth.currentUser?.uid;
    if (!accountID) {
      return;
    }
    this.monthlyPayments$ = this.MonthlyPaymentApp.list$(accountID);
    this.balances$ = this.balanceApp.getByUid$(accountID);
  }
  ngOnInit(): void {}
}
