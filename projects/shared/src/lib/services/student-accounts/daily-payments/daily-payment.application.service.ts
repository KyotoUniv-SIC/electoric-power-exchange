import { DailyPaymentService } from './daily-payment.service';
import { Injectable } from '@angular/core';
import { DailyPayment } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class DailyPaymentApplicationService {
  constructor(private readonly dailyPayment: DailyPaymentService) {}

  list(uid: string) {
    return this.dailyPayment.list(uid);
  }

  list$(uid: string) {
    return this.dailyPayment.list$(uid);
  }
}
