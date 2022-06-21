import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyPaymentInfrastructureService } from './daily-payment.infrastructure.service';
import { DailyPayment } from '@local/common';

export interface IDailyPaymentInfrastructureService {
  get(studentAccountID: string, id: string): Promise<DailyPayment | undefined>;
  get$(studentAccountID: string, id: string): Observable<DailyPayment | undefined>;
  list(studentAccountID: string): Promise<DailyPayment[]>;
  list$(studentAccountID: string): Observable<DailyPayment[]>;
  listGroup(): Promise<DailyPayment[]>;
  listGroup$(): Observable<DailyPayment[]>;
  create(data: DailyPayment): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class DailyPaymentService {
  private iDailyPaymentInfrastructure: IDailyPaymentInfrastructureService;

  constructor(readonly dailyPaymentInfrastructure: DailyPaymentInfrastructureService) {
    this.iDailyPaymentInfrastructure = dailyPaymentInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iDailyPaymentInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iDailyPaymentInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iDailyPaymentInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iDailyPaymentInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iDailyPaymentInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iDailyPaymentInfrastructure.listGroup$();
  }

  create(data: DailyPayment) {
    return this.iDailyPaymentInfrastructure.create(data);
  }
}
