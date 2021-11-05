import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BidRequestInfrastructureService } from './bid-request.infrastructure.service';
import { BidRequest } from '@local/common';

export interface IBidRequestInfrastructureService {
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
export class BidRequestService {
  private iBidRequestInfrastructure: IBidRequestInfrastructureService;

  constructor(readonly bidRequestInfrastructure: BidRequestInfrastructureService) {
    this.iBidRequestInfrastructure = bidRequestInfrastructure;
  }

  get(id: string) {
    return this.iBidRequestInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iBidRequestInfrastructure.get$(id);
  }

  list() {
    return this.iBidRequestInfrastructure.list();
  }
  
  list$() {
    return this.iBidRequestInfrastructure.list$();
  }
  
  listGroup() {
    return this.iBidRequestInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iBidRequestInfrastructure.listGroup$();
  }

  create(data: BidRequest) {
    return this.iBidRequestInfrastructure.create(data);
  }
}
