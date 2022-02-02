import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsufficientBalanceInfrastructureService } from './insufficient-balance.infrastructure.service';
import { InsufficientBalance } from '@local/common';

export interface IInsufficientBalanceInfrastructureService {
  get(studentAccountID: string, id: string): Promise<InsufficientBalance | undefined>;
  get$(studentAccountID: string, id: string): Observable<InsufficientBalance | undefined>;
  list(studentAccountID: string): Promise<InsufficientBalance[]>;
  list$(studentAccountID: string): Observable<InsufficientBalance[]>;
  listGroup(): Promise<InsufficientBalance[]>;
  listGroup$(): Observable<InsufficientBalance[]>;
  create(data: InsufficientBalance): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class InsufficientBalanceService {
  private iInsufficientBalanceInfrastructure: IInsufficientBalanceInfrastructureService;

  constructor(readonly insufficientBalanceInfrastructure: InsufficientBalanceInfrastructureService) {
    this.iInsufficientBalanceInfrastructure = insufficientBalanceInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iInsufficientBalanceInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iInsufficientBalanceInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iInsufficientBalanceInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iInsufficientBalanceInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iInsufficientBalanceInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iInsufficientBalanceInfrastructure.listGroup$();
  }

  create(data: InsufficientBalance) {
    return this.iInsufficientBalanceInfrastructure.create(data);
  }
}
