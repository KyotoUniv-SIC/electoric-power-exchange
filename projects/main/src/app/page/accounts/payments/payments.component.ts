import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { MonthlyPayment, StudentAccount } from '@local/common';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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
      map((payments) =>
        !payments
          ? null
          : payments.sort((first, second) => {
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
  }

  ngOnInit(): void {}
}
