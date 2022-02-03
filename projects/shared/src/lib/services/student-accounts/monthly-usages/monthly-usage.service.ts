import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyUsageInfrastructureService } from './monthly-usage.infrastructure.service';
import { MonthlyUsage } from '@local/common';

export interface IMonthlyUsageInfrastructureService {
  get(studentAccountID: string, id: string): Promise<MonthlyUsage | undefined>;
  get$(studentAccountID: string, id: string): Observable<MonthlyUsage | undefined>;
  list(studentAccountID: string): Promise<MonthlyUsage[]>;
  list$(studentAccountID: string): Observable<MonthlyUsage[]>;
  listGroup(): Promise<MonthlyUsage[]>;
  listGroup$(): Observable<MonthlyUsage[]>;
  create(data: MonthlyUsage): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class MonthlyUsageService {
  private iMonthlyUsageInfrastructure: IMonthlyUsageInfrastructureService;

  constructor(readonly monthlyUsageInfrastructure: MonthlyUsageInfrastructureService) {
    this.iMonthlyUsageInfrastructure = monthlyUsageInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iMonthlyUsageInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iMonthlyUsageInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iMonthlyUsageInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iMonthlyUsageInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iMonthlyUsageInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iMonthlyUsageInfrastructure.listGroup$();
  }

  create(data: MonthlyUsage) {
    return this.iMonthlyUsageInfrastructure.create(data);
  }
}
