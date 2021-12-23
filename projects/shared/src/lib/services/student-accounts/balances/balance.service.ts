import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceInfrastructureService } from './balance.infrastructure.service';
import { Balance } from '@local/common';

export interface IBalanceInfrastructureService {
  get(studentAccountID: string, id: string): Promise<Balance | undefined>;
  get$(studentAccountID: string, id: string): Observable<Balance | undefined>;
  list(studentAccountID: string): Promise<Balance[]>;
  list$(studentAccountID: string): Observable<Balance[]>;
  listGroup(): Promise<Balance[]>;
  listGroup$(): Observable<Balance[]>;
  create(data: Balance): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private iBalanceInfrastructure: IBalanceInfrastructureService;

  constructor(readonly balanceInfrastructure: BalanceInfrastructureService) {
    this.iBalanceInfrastructure = balanceInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iBalanceInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iBalanceInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iBalanceInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iBalanceInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iBalanceInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iBalanceInfrastructure.listGroup$();
  }

  create(data: Balance) {
    return this.iBalanceInfrastructure.create(data);
  }
}
