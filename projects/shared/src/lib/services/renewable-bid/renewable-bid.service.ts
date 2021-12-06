import { RenewableBidInfrastructureService } from './renewable-bid.infrastructure.service';
import { Injectable } from '@angular/core';
import { RenewableBid } from '@local/common';
import { Observable } from 'rxjs';

export interface IRenewableBidInfrastructureService {
  get(id: string): Promise<RenewableBid | undefined>;
  get$(id: string): Observable<RenewableBid | undefined>;
  list(): Promise<RenewableBid[]>;
  list$(): Observable<RenewableBid[]>;
  listGroup(): Promise<RenewableBid[]>;
  listGroup$(): Observable<RenewableBid[]>;
  create(data: RenewableBid): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableBidService {
  private iRenewableBidInfrastructure: IRenewableBidInfrastructureService;

  constructor(readonly bidRequestInfrastructure: RenewableBidInfrastructureService) {
    this.iRenewableBidInfrastructure = bidRequestInfrastructure;
  }

  get(id: string) {
    return this.iRenewableBidInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableBidInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableBidInfrastructure.list();
  }

  list$() {
    return this.iRenewableBidInfrastructure.list$();
  }

  listGroup() {
    return this.iRenewableBidInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iRenewableBidInfrastructure.listGroup$();
  }

  create(data: RenewableBid) {
    return this.iRenewableBidInfrastructure.create(data);
  }
}
