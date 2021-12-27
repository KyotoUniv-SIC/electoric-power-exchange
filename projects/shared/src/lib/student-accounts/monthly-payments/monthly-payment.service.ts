import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyPaymentInfrastructureService } from './monthly-payment.infrastructure.service';
import { MonthlyPayment } from '@local/common';

export interface IMonthlyPaymentInfrastructureService {
  get(studentAccountID: string, id: string): Promise<MonthlyPayment | undefined>;
  get$(studentAccountID: string, id: string): Observable<MonthlyPayment | undefined>;
  list(studentAccountID: string): Promise<MonthlyPayment[]>;
  list$(studentAccountID: string): Observable<MonthlyPayment[]>;
  listGroup(): Promise<MonthlyPayment[]>;
  listGroup$(): Observable<MonthlyPayment[]>;
  create(data: MonthlyPayment): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentService {
  private iMonthlyPaymentInfrastructure: IMonthlyPaymentInfrastructureService;

  constructor(readonly monthlyPaymentInfrastructure: MonthlyPaymentInfrastructureService) {
    this.iMonthlyPaymentInfrastructure = monthlyPaymentInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iMonthlyPaymentInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iMonthlyPaymentInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iMonthlyPaymentInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iMonthlyPaymentInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iMonthlyPaymentInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iMonthlyPaymentInfrastructure.listGroup$();
  }

  create(data: MonthlyPayment) {
    return this.iMonthlyPaymentInfrastructure.create(data);
  }
}
