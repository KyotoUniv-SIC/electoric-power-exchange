import { BidInfrastructureService } from './bid.infrastructure.service';
import { Injectable } from '@angular/core';
import { proto } from '@local/common';
import { Observable } from 'rxjs';

export interface IBidInfrastructureService {
  get(id: string): Promise<proto.main.BidRequest | undefined>;
  get$(id: string): Observable<proto.main.BidRequest | undefined>;
  list(): Promise<proto.main.BidRequest[]>;
  list$(): Observable<proto.main.BidRequest[]>;
  listGroup(): Promise<proto.main.BidRequest[]>;
  listGroup$(): Observable<proto.main.BidRequest[]>;
  create(data: proto.main.BidRequest): Promise<void>;
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
}
