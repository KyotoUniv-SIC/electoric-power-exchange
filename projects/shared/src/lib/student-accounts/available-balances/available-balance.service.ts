import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableBalanceInfrastructureService } from './available-balance.infrastructure.service';
import { AvailableBalance } from '@local/common';

export interface IAvailableBalanceInfrastructureService {
  get(studentAccountID: string, id: string): Promise<AvailableBalance | undefined>;
  get$(studentAccountID: string, id: string): Observable<AvailableBalance | undefined>;
  list(studentAccountID: string): Promise<AvailableBalance[]>;
  list$(studentAccountID: string): Observable<AvailableBalance[]>;
  listGroup(): Promise<AvailableBalance[]>;
  listGroup$(): Observable<AvailableBalance[]>;
  create(data: AvailableBalance): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class AvailableBalanceService {
  private iAvailableBalanceInfrastructure: IAvailableBalanceInfrastructureService;

  constructor(readonly availableBalanceInfrastructure: AvailableBalanceInfrastructureService) {
    this.iAvailableBalanceInfrastructure = availableBalanceInfrastructure;
  }

  get(studentAccountID: string, id: string) {
    return this.iAvailableBalanceInfrastructure.get(studentAccountID, id);
  }

  get$(studentAccountID: string, id: string) {
    return this.iAvailableBalanceInfrastructure.get$(studentAccountID, id);
  }

  list(studentAccountID: string) {
    return this.iAvailableBalanceInfrastructure.list(studentAccountID);
  }
  
  list$(studentAccountID: string) {
    return this.iAvailableBalanceInfrastructure.list$(studentAccountID);
  }
  
  listGroup() {
    return this.iAvailableBalanceInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iAvailableBalanceInfrastructure.listGroup$();
  }

  create(data: AvailableBalance) {
    return this.iAvailableBalanceInfrastructure.create(data);
  }
}
