import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountPrivateInfrastructureService } from './account-private.infrastructure.service';
import { AccountPrivate } from '@local/common';

export interface IAccountPrivateInfrastructureService {
  get(studentAccountID: string, id: string): Promise<AccountPrivate | undefined>;
  get$(studentAccountID: string, id: string): Observable<AccountPrivate | undefined>;
  list(studentAccountID: string): Promise<AccountPrivate[]>;
  list$(studentAccountID: string): Observable<AccountPrivate[]>;
  listGroup(): Promise<AccountPrivate[]>;
  listGroup$(): Observable<AccountPrivate[]>;
  create(data: AccountPrivate): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class AccountPrivateService {
  private iAccountPrivateInfrastructure: IAccountPrivateInfrastructureService;

  constructor(readonly accountPrivateInfrastructure: AccountPrivateInfrastructureService) {
    this.iAccountPrivateInfrastructure = accountPrivateInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iAccountPrivateInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iAccountPrivateInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iAccountPrivateInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iAccountPrivateInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iAccountPrivateInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iAccountPrivateInfrastructure.listGroup$();
  }

  create(data: AccountPrivate) {
    return this.iAccountPrivateInfrastructure.create(data);
  }
}
