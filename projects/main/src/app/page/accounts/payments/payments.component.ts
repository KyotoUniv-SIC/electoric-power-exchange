import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { MonthlyPayment, StudentAccount } from '@local/common';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  studentAccount$: Observable<StudentAccount> | undefined;
  monthlyPayments$: Observable<MonthlyPayment[] | null> | undefined;

  constructor(
    private auth: Auth,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));

    this.monthlyPayments$ = this.studentAccount$.pipe(
      mergeMap((account) => (!account ? of(null) : this.monthlyPaymentApp.list$(account.id))),
    );
  }

  ngOnInit(): void {}
}
