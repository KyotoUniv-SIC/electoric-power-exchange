import { NormalBidInfrastructureService } from './normal-bid.infrastructure.service';
import { Injectable } from '@angular/core';
import { NormalBid } from '@local/common';
import { Observable } from 'rxjs';

export interface INormalBidInfrastructureService {
  get(id: string): Promise<NormalBid | undefined>;
  get$(id: string): Observable<NormalBid | undefined>;
  list(): Promise<NormalBid[]>;
  list$(): Observable<NormalBid[]>;
  listGroup(): Promise<NormalBid[]>;
  listGroup$(): Observable<NormalBid[]>;
  create(data: NormalBid): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalBidService {
  private iNormalBidInfrastructure: INormalBidInfrastructureService;

  constructor(readonly bidRequestInfrastructure: NormalBidInfrastructureService) {
    this.iNormalBidInfrastructure = bidRequestInfrastructure;
  }

  get(id: string) {
    return this.iNormalBidInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalBidInfrastructure.get$(id);
  }

  list() {
    return this.iNormalBidInfrastructure.list();
  }

  list$() {
    return this.iNormalBidInfrastructure.list$();
  }

  listGroup() {
    return this.iNormalBidInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iNormalBidInfrastructure.listGroup$();
  }

  create(data: NormalBid) {
    return this.iNormalBidInfrastructure.create(data);
  }
}
