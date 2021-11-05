import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AskRequestInfrastructureService } from './ask-request.infrastructure.service';
import { AskRequest } from '@local/common';

export interface IAskRequestInfrastructureService {
  get(id: string): Promise<AskRequest | undefined>;
  get$(id: string): Observable<AskRequest | undefined>;
  list(): Promise<AskRequest[]>;
  list$(): Observable<AskRequest[]>;
  listGroup(): Promise<AskRequest[]>;
  listGroup$(): Observable<AskRequest[]>;
  create(data: AskRequest): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class AskRequestService {
  private iAskRequestInfrastructure: IAskRequestInfrastructureService;

  constructor(readonly askRequestInfrastructure: AskRequestInfrastructureService) {
    this.iAskRequestInfrastructure = askRequestInfrastructure;
  }

  get(id: string) {
    return this.iAskRequestInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iAskRequestInfrastructure.get$(id);
  }

  list() {
    return this.iAskRequestInfrastructure.list();
  }
  
  list$() {
    return this.iAskRequestInfrastructure.list$();
  }
  
  listGroup() {
    return this.iAskRequestInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iAskRequestInfrastructure.listGroup$();
  }

  create(data: AskRequest) {
    return this.iAskRequestInfrastructure.create(data);
  }
}
