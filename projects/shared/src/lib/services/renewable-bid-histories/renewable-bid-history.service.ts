import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenewableBidHistoryInfrastructureService } from './renewable-bid-history.infrastructure.service';
import { RenewableBidHistory } from '@local/common';

export interface IRenewableBidHistoryInfrastructureService {
  get(id: string): Promise<RenewableBidHistory | undefined>;
  get$(id: string): Observable<RenewableBidHistory | undefined>;
  list(): Promise<RenewableBidHistory[]>;
  list$(): Observable<RenewableBidHistory[]>;
  listGroup(): Promise<RenewableBidHistory[]>;
  listGroup$(): Observable<RenewableBidHistory[]>;
  create(data: RenewableBidHistory): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableBidHistoryService {
  private iRenewableBidHistoryInfrastructure: IRenewableBidHistoryInfrastructureService;

  constructor(readonly renewableBidHistoryInfrastructure: RenewableBidHistoryInfrastructureService) {
    this.iRenewableBidHistoryInfrastructure = renewableBidHistoryInfrastructure;
  }

  get(id: string) {
    return this.iRenewableBidHistoryInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableBidHistoryInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableBidHistoryInfrastructure.list();
  }
  
  list$() {
    return this.iRenewableBidHistoryInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRenewableBidHistoryInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRenewableBidHistoryInfrastructure.listGroup$();
  }

  create(data: RenewableBidHistory) {
    return this.iRenewableBidHistoryInfrastructure.create(data);
  }
}
