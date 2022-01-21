import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NormalBidDeleteInfrastructureService } from './normal-bid-delete.infrastructure.service';
import { NormalBidDelete } from '@local/common';

export interface INormalBidDeleteInfrastructureService {
  get(id: string): Promise<NormalBidDelete | undefined>;
  get$(id: string): Observable<NormalBidDelete | undefined>;
  list(): Promise<NormalBidDelete[]>;
  list$(): Observable<NormalBidDelete[]>;
  listGroup(): Promise<NormalBidDelete[]>;
  listGroup$(): Observable<NormalBidDelete[]>;
  create(data: NormalBidDelete): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalBidDeleteService {
  private iNormalBidDeleteInfrastructure: INormalBidDeleteInfrastructureService;

  constructor(readonly normalBidDeleteInfrastructure: NormalBidDeleteInfrastructureService) {
    this.iNormalBidDeleteInfrastructure = normalBidDeleteInfrastructure;
  }

  get(id: string) {
    return this.iNormalBidDeleteInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalBidDeleteInfrastructure.get$(id);
  }

  list() {
    return this.iNormalBidDeleteInfrastructure.list();
  }
  
  list$() {
    return this.iNormalBidDeleteInfrastructure.list$();
  }
  
  listGroup() {
    return this.iNormalBidDeleteInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iNormalBidDeleteInfrastructure.listGroup$();
  }

  create(data: NormalBidDelete) {
    return this.iNormalBidDeleteInfrastructure.create(data);
  }
}
