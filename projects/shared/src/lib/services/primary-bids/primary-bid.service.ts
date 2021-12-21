import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimaryBidInfrastructureService } from './primary-bid.infrastructure.service';
import { PrimaryBid } from '@local/common';

export interface IPrimaryBidInfrastructureService {
  get(id: string): Promise<PrimaryBid | undefined>;
  get$(id: string): Observable<PrimaryBid | undefined>;
  list(): Promise<PrimaryBid[]>;
  list$(): Observable<PrimaryBid[]>;
  listGroup(): Promise<PrimaryBid[]>;
  listGroup$(): Observable<PrimaryBid[]>;
  create(data: PrimaryBid): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class PrimaryBidService {
  private iPrimaryBidInfrastructure: IPrimaryBidInfrastructureService;

  constructor(readonly primaryBidInfrastructure: PrimaryBidInfrastructureService) {
    this.iPrimaryBidInfrastructure = primaryBidInfrastructure;
  }

  get(id: string) {
    return this.iPrimaryBidInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iPrimaryBidInfrastructure.get$(id);
  }

  list() {
    return this.iPrimaryBidInfrastructure.list();
  }
  
  list$() {
    return this.iPrimaryBidInfrastructure.list$();
  }
  
  listGroup() {
    return this.iPrimaryBidInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iPrimaryBidInfrastructure.listGroup$();
  }

  create(data: PrimaryBid) {
    return this.iPrimaryBidInfrastructure.create(data);
  }
}
