import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NormalAskDeleteInfrastructureService } from './normal-ask-delete.infrastructure.service';
import { NormalAskDelete } from '@local/common';

export interface INormalAskDeleteInfrastructureService {
  get(id: string): Promise<NormalAskDelete | undefined>;
  get$(id: string): Observable<NormalAskDelete | undefined>;
  list(): Promise<NormalAskDelete[]>;
  list$(): Observable<NormalAskDelete[]>;
  listGroup(): Promise<NormalAskDelete[]>;
  listGroup$(): Observable<NormalAskDelete[]>;
  create(data: NormalAskDelete): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalAskDeleteService {
  private iNormalAskDeleteInfrastructure: INormalAskDeleteInfrastructureService;

  constructor(readonly normalAskDeleteInfrastructure: NormalAskDeleteInfrastructureService) {
    this.iNormalAskDeleteInfrastructure = normalAskDeleteInfrastructure;
  }

  get(id: string) {
    return this.iNormalAskDeleteInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalAskDeleteInfrastructure.get$(id);
  }

  list() {
    return this.iNormalAskDeleteInfrastructure.list();
  }
  
  list$() {
    return this.iNormalAskDeleteInfrastructure.list$();
  }
  
  listGroup() {
    return this.iNormalAskDeleteInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iNormalAskDeleteInfrastructure.listGroup$();
  }

  create(data: NormalAskDelete) {
    return this.iNormalAskDeleteInfrastructure.create(data);
  }
}
