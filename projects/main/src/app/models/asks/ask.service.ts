import { AskInfrastructureService } from './ask.infrastructure.service';
import { Injectable } from '@angular/core';
import { proto } from '@local/common';
import { Observable } from 'rxjs';

export interface IAskInfrastructureService {
  get(id: string): Promise<proto.main.AskRequest | undefined>;
  get$(id: string): Observable<proto.main.AskRequest | undefined>;
  list(): Promise<proto.main.AskRequest[]>;
  list$(): Observable<proto.main.AskRequest[]>;
  listGroup(): Promise<proto.main.AskRequest[]>;
  listGroup$(): Observable<proto.main.AskRequest[]>;
  create(data: proto.main.AskRequest): Promise<void>;
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
}
