import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenewableBidDeleteInfrastructureService } from './renewable-bid-delete.infrastructure.service';
import { RenewableBidDelete } from '@local/common';

export interface IRenewableBidDeleteInfrastructureService {
  get(id: string): Promise<RenewableBidDelete | undefined>;
  get$(id: string): Observable<RenewableBidDelete | undefined>;
  list(): Promise<RenewableBidDelete[]>;
  list$(): Observable<RenewableBidDelete[]>;
  listGroup(): Promise<RenewableBidDelete[]>;
  listGroup$(): Observable<RenewableBidDelete[]>;
  create(data: RenewableBidDelete): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RenewableBidDeleteService {
  private iRenewableBidDeleteInfrastructure: IRenewableBidDeleteInfrastructureService;

  constructor(readonly renewableBidDeleteInfrastructure: RenewableBidDeleteInfrastructureService) {
    this.iRenewableBidDeleteInfrastructure = renewableBidDeleteInfrastructure;
  }

  get(id: string) {
    return this.iRenewableBidDeleteInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRenewableBidDeleteInfrastructure.get$(id);
  }

  list() {
    return this.iRenewableBidDeleteInfrastructure.list();
  }
  
  list$() {
    return this.iRenewableBidDeleteInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRenewableBidDeleteInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRenewableBidDeleteInfrastructure.listGroup$();
  }

  create(data: RenewableBidDelete) {
    return this.iRenewableBidDeleteInfrastructure.create(data);
  }
}
