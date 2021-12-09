import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NormalAskHistoryInfrastructureService } from './normal-ask-history.infrastructure.service';
import { NormalAskHistory } from '@local/common';

export interface INormalAskHistoryInfrastructureService {
  get(id: string): Promise<NormalAskHistory | undefined>;
  get$(id: string): Observable<NormalAskHistory | undefined>;
  list(): Promise<NormalAskHistory[]>;
  list$(): Observable<NormalAskHistory[]>;
  listGroup(): Promise<NormalAskHistory[]>;
  listGroup$(): Observable<NormalAskHistory[]>;
  create(data: NormalAskHistory): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalAskHistoryService {
  private iNormalAskHistoryInfrastructure: INormalAskHistoryInfrastructureService;

  constructor(readonly normalAskHistoryInfrastructure: NormalAskHistoryInfrastructureService) {
    this.iNormalAskHistoryInfrastructure = normalAskHistoryInfrastructure;
  }

  get(id: string) {
    return this.iNormalAskHistoryInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalAskHistoryInfrastructure.get$(id);
  }

  list() {
    return this.iNormalAskHistoryInfrastructure.list();
  }
  
  list$() {
    return this.iNormalAskHistoryInfrastructure.list$();
  }
  
  listGroup() {
    return this.iNormalAskHistoryInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iNormalAskHistoryInfrastructure.listGroup$();
  }

  create(data: NormalAskHistory) {
    return this.iNormalAskHistoryInfrastructure.create(data);
  }
}
