import { NormalBidHistoryInfrastructureService } from './normal-bid-history.infrastructure.service';
import { Injectable } from '@angular/core';
import { NormalBidHistory } from '@local/common';
import { Observable } from 'rxjs';

export interface INormalBidHistoryInfrastructureService {
  get(id: string): Promise<NormalBidHistory | undefined>;
  get$(id: string): Observable<NormalBidHistory | undefined>;
  list(): Promise<NormalBidHistory[]>;
  list$(): Observable<NormalBidHistory[]>;
  listGroup(): Promise<NormalBidHistory[]>;
  listGroup$(): Observable<NormalBidHistory[]>;
  create(data: NormalBidHistory): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalBidHistoryService {
  private iNormalBidHistoryInfrastructure: INormalBidHistoryInfrastructureService;

  constructor(readonly normalBidHistoryInfrastructure: NormalBidHistoryInfrastructureService) {
    this.iNormalBidHistoryInfrastructure = normalBidHistoryInfrastructure;
  }

  get(id: string) {
    return this.iNormalBidHistoryInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalBidHistoryInfrastructure.get$(id);
  }

  list() {
    return this.iNormalBidHistoryInfrastructure.list();
  }

  list$() {
    return this.iNormalBidHistoryInfrastructure.list$();
  }

  listGroup() {
    return this.iNormalBidHistoryInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iNormalBidHistoryInfrastructure.listGroup$();
  }

  create(data: NormalBidHistory) {
    return this.iNormalBidHistoryInfrastructure.create(data);
  }
}
