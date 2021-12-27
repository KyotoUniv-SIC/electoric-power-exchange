import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyUsageInfrastructureService } from './daily-usage.infrastructure.service';
import { DailyUsage } from '@local/common';

export interface IDailyUsageInfrastructureService {
  get(studentAccountID: string, id: string): Promise<DailyUsage | undefined>;
  get$(studentAccountID: string, id: string): Observable<DailyUsage | undefined>;
  list(studentAccountID: string): Promise<DailyUsage[]>;
  list$(studentAccountID: string): Observable<DailyUsage[]>;
  listGroup(): Promise<DailyUsage[]>;
  listGroup$(): Observable<DailyUsage[]>;
  create(data: DailyUsage): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class DailyUsageService {
  private iDailyUsageInfrastructure: IDailyUsageInfrastructureService;

  constructor(readonly dailyUsageInfrastructure: DailyUsageInfrastructureService) {
    this.iDailyUsageInfrastructure = dailyUsageInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iDailyUsageInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iDailyUsageInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iDailyUsageInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iDailyUsageInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iDailyUsageInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iDailyUsageInfrastructure.listGroup$();
  }

  create(data: DailyUsage) {
    return this.iDailyUsageInfrastructure.create(data);
  }
}
