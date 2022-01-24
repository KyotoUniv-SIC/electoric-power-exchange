import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyUsageInfrastructureService } from './daily-usage.infrastructure.service';
import { DailyUsage } from '@local/common';

export interface IDailyUsageInfrastructureService {
  get(id: string): Promise<DailyUsage | undefined>;
  get$(id: string): Observable<DailyUsage | undefined>;
  list(): Promise<DailyUsage[]>;
  list$(): Observable<DailyUsage[]>;
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

  get(id: string) {
    return this.iDailyUsageInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iDailyUsageInfrastructure.get$(id);
  }

  list() {
    return this.iDailyUsageInfrastructure.list();
  }
  
  list$() {
    return this.iDailyUsageInfrastructure.list$();
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
