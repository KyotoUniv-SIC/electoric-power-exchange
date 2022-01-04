import { Injectable } from '@angular/core';
import { MonthlyPaymentService } from './monthly-payment.service';
import { MonthlyPayment } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentApplicationService {
  
  constructor(private readonly monthlyPayment: MonthlyPaymentService) {}
}