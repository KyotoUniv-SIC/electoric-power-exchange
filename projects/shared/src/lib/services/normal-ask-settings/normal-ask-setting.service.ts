import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NormalAskSettingInfrastructureService } from './normal-ask-setting.infrastructure.service';
import { NormalAskSetting } from '@local/common';

export interface INormalAskSettingInfrastructureService {
  get(id: string): Promise<NormalAskSetting | undefined>;
  get$(id: string): Observable<NormalAskSetting | undefined>;
  list(): Promise<NormalAskSetting[]>;
  list$(): Observable<NormalAskSetting[]>;
  listGroup(): Promise<NormalAskSetting[]>;
  listGroup$(): Observable<NormalAskSetting[]>;
  create(data: NormalAskSetting): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalAskSettingService {
  private iNormalAskSettingInfrastructure: INormalAskSettingInfrastructureService;

  constructor(readonly normalAskSettingInfrastructure: NormalAskSettingInfrastructureService) {
    this.iNormalAskSettingInfrastructure = normalAskSettingInfrastructure;
  }

  get(id: string) {
    return this.iNormalAskSettingInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalAskSettingInfrastructure.get$(id);
  }

  list() {
    return this.iNormalAskSettingInfrastructure.list();
  }
  
  list$() {
    return this.iNormalAskSettingInfrastructure.list$();
  }
  
  listGroup() {
    return this.iNormalAskSettingInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iNormalAskSettingInfrastructure.listGroup$();
  }

  create(data: NormalAskSetting) {
    return this.iNormalAskSettingInfrastructure.create(data);
  }
}
