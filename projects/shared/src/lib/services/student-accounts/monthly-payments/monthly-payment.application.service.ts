import { MonthlyPaymentService } from './monthly-payment.service';
import { Injectable } from '@angular/core';
import { MonthlyPayment } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentApplicationService {
  constructor(private readonly monthlyPayment: MonthlyPaymentService) {}

  get$(uid: string, paymentID: string) {
    return this.monthlyPayment.get$(uid, paymentID);
  }

  list$(uid: string) {
    return this.monthlyPayment.list$(uid);
  }
}
