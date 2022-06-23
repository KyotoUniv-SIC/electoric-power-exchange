import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MonthlyPayment, StudentAccount } from '@local/common';
import { MonthlyPaymentApplicationService } from 'projects/shared/src/lib/services/student-accounts/monthly-payments/monthly-payment.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  studentAccount$: Observable<StudentAccount> | undefined;
  monthlyPayment$: Observable<MonthlyPayment | null | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly monthlyPaymentApp: MonthlyPaymentApplicationService,
  ) {
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const paymentID$ = this.route.params.pipe(map((parames) => parames.payment_id));
    this.monthlyPayment$ = combineLatest([this.studentAccount$, paymentID$]).pipe(
      mergeMap(([account, paymentID]) => (!account ? of(null) : this.monthlyPaymentApp.get$(account.id, paymentID))),
    );
    this.createdAt$ = this.monthlyPayment$.pipe(map((payment) => (payment?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
