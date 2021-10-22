import { BidInfrastructureService } from './bid.infrastructure.service';
import { Injectable } from '@angular/core';
import { BidRequest } from 'common/src/entities/bids';
import { Observable } from 'rxjs';

export interface IBidInfrastructureService {
  get(id: string): Promise<BidRequest | undefined>;
  get$(id: string): Observable<BidRequest | undefined>;
  list(): Promise<BidRequest[]>;
  list$(): Observable<BidRequest[]>;
  listGroup(): Promise<BidRequest[]>;
  listGroup$(): Observable<BidRequest[]>;
  create(data: BidRequest): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private iBidInfrastructure: IBidInfrastructureService;

  constructor(readonly bidInfrastructure: BidInfrastructureService) {
    this.iBidInfrastructure = bidInfrastructure;
  }

  get(id: string) {
    return this.iBidInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iBidInfrastructure.get$(id);
  }

  list() {
    return this.iBidInfrastructure.list();
  }

  list$() {
    return this.iBidInfrastructure.list$();
  }

  listGroup() {
    return this.iBidInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iBidInfrastructure.listGroup$();
  }

  create(data: BidRequest) {
    return this.iBidInfrastructure.create(data);
  }
}
