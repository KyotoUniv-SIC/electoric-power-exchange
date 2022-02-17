import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenewableAskSettingInfrastructureService } from './renewable-ask-setting.infrastructure.service';
import { RenewableAskSetting } from '@local/common';

export interface IRenewableAskSettingInfrastructureService {
  get(id: string): Promise<RenewableAskSetting | undefined>;
  get$(id: string): Observable<RenewableAskSetting | undefined>;
  list(): Promise<RenewableAskSetting[]>;
  list$(): Observable<RenewableAskSetting[]>;
  listGroup(): Promise<RenewableAskSetting[]>;
  listGroup$(): Observable<RenewableAskSetting[]>;
  create(data: RenewableAskSetting): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableAskSettingService {
  private iRenewableAskSettingInfrastructure: IRenewableAskSettingInfrastructureService;

  constructor(readonly renewableAskSettingInfrastructure: RenewableAskSettingInfrastructureService) {
    this.iRenewableAskSettingInfrastructure = renewableAskSettingInfrastructure;
  }

  get(id: string) {
    return this.iRenewableAskSettingInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableAskSettingInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableAskSettingInfrastructure.list();
  }
  
  list$() {
    return this.iRenewableAskSettingInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRenewableAskSettingInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRenewableAskSettingInfrastructure.listGroup$();
  }

  create(data: RenewableAskSetting) {
    return this.iRenewableAskSettingInfrastructure.create(data);
  }
}
