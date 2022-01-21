import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenewableAskDeleteInfrastructureService } from './renewable-ask-delete.infrastructure.service';
import { RenewableAskDelete } from '@local/common';

export interface IRenewableAskDeleteInfrastructureService {
  get(id: string): Promise<RenewableAskDelete | undefined>;
  get$(id: string): Observable<RenewableAskDelete | undefined>;
  list(): Promise<RenewableAskDelete[]>;
  list$(): Observable<RenewableAskDelete[]>;
  listGroup(): Promise<RenewableAskDelete[]>;
  listGroup$(): Observable<RenewableAskDelete[]>;
  create(data: RenewableAskDelete): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableAskDeleteService {
  private iRenewableAskDeleteInfrastructure: IRenewableAskDeleteInfrastructureService;

  constructor(readonly renewableAskDeleteInfrastructure: RenewableAskDeleteInfrastructureService) {
    this.iRenewableAskDeleteInfrastructure = renewableAskDeleteInfrastructure;
  }

  get(id: string) {
    return this.iRenewableAskDeleteInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableAskDeleteInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableAskDeleteInfrastructure.list();
  }
  
  list$() {
    return this.iRenewableAskDeleteInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRenewableAskDeleteInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRenewableAskDeleteInfrastructure.listGroup$();
  }

  create(data: RenewableAskDelete) {
    return this.iRenewableAskDeleteInfrastructure.create(data);
  }
}
