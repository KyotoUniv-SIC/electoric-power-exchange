import { AskInfrastructureService } from './ask.infrastructure.service';
import { Injectable } from '@angular/core';
import { AskRequest } from 'common/src/entities/asks';
import { Observable } from 'rxjs';

export interface IAskInfrastructureService {
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
export class AskService {
  private iAskInfrastructure: IAskInfrastructureService;

  constructor(readonly askInfrastructure: AskInfrastructureService) {
    this.iAskInfrastructure = askInfrastructure;
  }

  get(id: string) {
    return this.iAskInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iAskInfrastructure.get$(id);
  }

  list() {
    return this.iAskInfrastructure.list();
  }

  list$() {
    return this.iAskInfrastructure.list$();
  }

  listGroup() {
    return this.iAskInfrastructure.listGroup();
  }

  listGroup$() {
    return this.iAskInfrastructure.listGroup$();
  }
  create(data: AskRequest) {
    return this.iAskInfrastructure.create(data);
  }
}
