import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenewableRewardSettingInfrastructureService } from './renewable-reward-setting.infrastructure.service';
import { RenewableRewardSetting } from '@local/common';

export interface IRenewableRewardSettingInfrastructureService {
  get(id: string): Promise<RenewableRewardSetting | undefined>;
  get$(id: string): Observable<RenewableRewardSetting | undefined>;
  list(): Promise<RenewableRewardSetting[]>;
  list$(): Observable<RenewableRewardSetting[]>;
  listGroup(): Promise<RenewableRewardSetting[]>;
  listGroup$(): Observable<RenewableRewardSetting[]>;
  create(data: RenewableRewardSetting): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableRewardSettingService {
  private iRenewableRewardSettingInfrastructure: IRenewableRewardSettingInfrastructureService;

  constructor(readonly renewableRewardSettingInfrastructure: RenewableRewardSettingInfrastructureService) {
    this.iRenewableRewardSettingInfrastructure = renewableRewardSettingInfrastructure;
  }

  get(id: string) {
    return this.iRenewableRewardSettingInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableRewardSettingInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableRewardSettingInfrastructure.list();
  }
  
  list$() {
    return this.iRenewableRewardSettingInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRenewableRewardSettingInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRenewableRewardSettingInfrastructure.listGroup$();
  }

  create(data: RenewableRewardSetting) {
    return this.iRenewableRewardSettingInfrastructure.create(data);
  }
}
