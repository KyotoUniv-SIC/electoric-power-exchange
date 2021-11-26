import { NormalAskInfrastructureService } from './normal-ask.infrastructure.service';
import { Injectable } from '@angular/core';
import { NormalAsk } from '@local/common';
import { Observable } from 'rxjs';

export interface INormalAskInfrastructureService {
  get(id: string): Promise<NormalAsk | undefined>;
  get$(id: string): Observable<NormalAsk | undefined>;
  list(): Promise<NormalAsk[]>;
  list$(): Observable<NormalAsk[]>;
  listGroup(): Promise<NormalAsk[]>;
  listGroup$(): Observable<NormalAsk[]>;
  create(data: NormalAsk): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NormalAskService {
  private iNormalAskInfrastructure: INormalAskInfrastructureService;

  constructor(readonly askRequestInfrastructure: NormalAskInfrastructureService) {
    this.iNormalAskInfrastructure = askRequestInfrastructure;
  }

  get(id: string) {
    return this.iNormalAskInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iNormalAskInfrastructure.get$(id);
  }

  list() {
    return this.iNormalAskInfrastructure.list();
  }

  list$() {
    return this.iNormalAskInfrastructure.list$();
  }

  listGroup() {
    return this.iNormalAskInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iNormalAskInfrastructure.listGroup$();
  }

  create(data: NormalAsk) {
    return this.iNormalAskInfrastructure.create(data);
  }
}
