import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostSettingInfrastructureService } from './cost-setting.infrastructure.service';
import { CostSetting } from '@local/common';

export interface ICostSettingInfrastructureService {
  get(id: string): Promise<CostSetting | undefined>;
  get$(id: string): Observable<CostSetting | undefined>;
  list(): Promise<CostSetting[]>;
  list$(): Observable<CostSetting[]>;
  listGroup(): Promise<CostSetting[]>;
  listGroup$(): Observable<CostSetting[]>;
  create(data: CostSetting): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class CostSettingService {
  private iCostSettingInfrastructure: ICostSettingInfrastructureService;

  constructor(readonly costSettingInfrastructure: CostSettingInfrastructureService) {
    this.iCostSettingInfrastructure = costSettingInfrastructure;
  }

  get(id: string) {
    return this.iCostSettingInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iCostSettingInfrastructure.get$(id);
  }

  list() {
    return this.iCostSettingInfrastructure.list();
  }
  
  list$() {
    return this.iCostSettingInfrastructure.list$();
  }
  
  listGroup() {
    return this.iCostSettingInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iCostSettingInfrastructure.listGroup$();
  }

  create(data: CostSetting) {
    return this.iCostSettingInfrastructure.create(data);
  }
}
