import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenewableAskHistoryInfrastructureService } from './renewable-ask-history.infrastructure.service';
import { RenewableAskHistory } from '@local/common';

export interface IRenewableAskHistoryInfrastructureService {
  get(id: string): Promise<RenewableAskHistory | undefined>;
  get$(id: string): Observable<RenewableAskHistory | undefined>;
  list(): Promise<RenewableAskHistory[]>;
  list$(): Observable<RenewableAskHistory[]>;
  listGroup(): Promise<RenewableAskHistory[]>;
  listGroup$(): Observable<RenewableAskHistory[]>;
  create(data: RenewableAskHistory): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableAskHistoryService {
  private iRenewableAskHistoryInfrastructure: IRenewableAskHistoryInfrastructureService;

  constructor(readonly renewableAskHistoryInfrastructure: RenewableAskHistoryInfrastructureService) {
    this.iRenewableAskHistoryInfrastructure = renewableAskHistoryInfrastructure;
  }

  get(id: string) {
    return this.iRenewableAskHistoryInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableAskHistoryInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableAskHistoryInfrastructure.list();
  }
  
  list$() {
    return this.iRenewableAskHistoryInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRenewableAskHistoryInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRenewableAskHistoryInfrastructure.listGroup$();
  }

  create(data: RenewableAskHistory) {
    return this.iRenewableAskHistoryInfrastructure.create(data);
  }
}
