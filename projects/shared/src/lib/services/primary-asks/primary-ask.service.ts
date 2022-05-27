import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimaryAskInfrastructureService } from './primary-ask.infrastructure.service';
import { PrimaryAsk } from '@local/common';

export interface IPrimaryAskInfrastructureService {
  get(id: string): Promise<PrimaryAsk | undefined>;
  get$(id: string): Observable<PrimaryAsk | undefined>;
  list(): Promise<PrimaryAsk[]>;
  list$(): Observable<PrimaryAsk[]>;
  listGroup(): Promise<PrimaryAsk[]>;
  listGroup$(): Observable<PrimaryAsk[]>;
  create(data: PrimaryAsk): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class PrimaryAskService {
  private iPrimaryAskInfrastructure: IPrimaryAskInfrastructureService;

  constructor(readonly primaryAskInfrastructure: PrimaryAskInfrastructureService) {
    this.iPrimaryAskInfrastructure = primaryAskInfrastructure;
  }

  get(id: string) {
    return this.iPrimaryAskInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iPrimaryAskInfrastructure.get$(id);
  }

  list() {
    return this.iPrimaryAskInfrastructure.list();
  }
  
  list$() {
    return this.iPrimaryAskInfrastructure.list$();
  }
  
  listGroup() {
    return this.iPrimaryAskInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iPrimaryAskInfrastructure.listGroup$();
  }

  create(data: PrimaryAsk) {
    return this.iPrimaryAskInfrastructure.create(data);
  }
}
