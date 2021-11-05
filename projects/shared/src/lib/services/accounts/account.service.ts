import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfrastructureService } from './account.infrastructure.service';
import { Account } from '@local/common';

export interface IAccountInfrastructureService {
  get(id: string): Promise<Account | undefined>;
  get$(id: string): Observable<Account | undefined>;
  list(): Promise<Account[]>;
  list$(): Observable<Account[]>;
  listGroup(): Promise<Account[]>;
  listGroup$(): Observable<Account[]>;
  create(data: Account): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private iAccountInfrastructure: IAccountInfrastructureService;

  constructor(readonly accountInfrastructure: AccountInfrastructureService) {
    this.iAccountInfrastructure = accountInfrastructure;
  }

  get(id: string) {
    return this.iAccountInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iAccountInfrastructure.get$(id);
  }

  list() {
    return this.iAccountInfrastructure.list();
  }
  
  list$() {
    return this.iAccountInfrastructure.list$();
  }
  
  listGroup() {
    return this.iAccountInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iAccountInfrastructure.listGroup$();
  }

  create(data: Account) {
    return this.iAccountInfrastructure.create(data);
  }
}
