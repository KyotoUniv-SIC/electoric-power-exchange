import { BidInfrastructureService } from './bid.infrastructure.service';
import { Injectable } from '@angular/core';
import { Bid } from 'common/src/entities/bids';
import { Observable } from 'rxjs';

export interface IBidInfrastructureService {
  get(id: string): Promise<Bid | undefined>;
  get$(id: string): Observable<Bid | undefined>;
  list(): Promise<Bid[]>;
  list$(): Observable<Bid[]>;
  listGroup(): Promise<Bid[]>;
  listGroup$(): Observable<Bid[]>;
  create(data: Bid): Promise<void>;
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
