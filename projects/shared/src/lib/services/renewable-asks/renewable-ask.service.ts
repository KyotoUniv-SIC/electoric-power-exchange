import { RenewableAskInfrastructureService } from './renewable-ask.infrastructure.service';
import { Injectable } from '@angular/core';
import { RenewableAsk } from '@local/common';
import { Observable } from 'rxjs';

export interface IRenewableAskInfrastructureService {
  get(id: string): Promise<RenewableAsk | undefined>;
  get$(id: string): Observable<RenewableAsk | undefined>;
  list(): Promise<RenewableAsk[]>;
  list$(): Observable<RenewableAsk[]>;
  listGroup(): Promise<RenewableAsk[]>;
  listGroup$(): Observable<RenewableAsk[]>;
  create(data: RenewableAsk): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableAskService {
  private iRenewableAskInfrastructure: IRenewableAskInfrastructureService;

  constructor(readonly askRequestInfrastructure: RenewableAskInfrastructureService) {
    this.iRenewableAskInfrastructure = askRequestInfrastructure;
  }

  get(id: string) {
    return this.iRenewableAskInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableAskInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableAskInfrastructure.list();
  }

  list$() {
    return this.iRenewableAskInfrastructure.list$();
  }

  listGroup() {
    return this.iRenewableAskInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iRenewableAskInfrastructure.listGroup$();
  }

  create(data: RenewableAsk) {
    return this.iRenewableAskInfrastructure.create(data);
  }
}
