import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SinglePriceRenewableSettlementInfrastructureService } from './single-price-renewable-settlement.infrastructure.service';
import { SinglePriceRenewableSettlement } from '@local/common';

export interface ISinglePriceRenewableSettlementInfrastructureService {
  get(id: string): Promise<SinglePriceRenewableSettlement | undefined>;
  get$(id: string): Observable<SinglePriceRenewableSettlement | undefined>;
  list(): Promise<SinglePriceRenewableSettlement[]>;
  list$(): Observable<SinglePriceRenewableSettlement[]>;
  listGroup(): Promise<SinglePriceRenewableSettlement[]>;
  listGroup$(): Observable<SinglePriceRenewableSettlement[]>;
  create(data: SinglePriceRenewableSettlement): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class SinglePriceRenewableSettlementService {
  private iSinglePriceRenewableSettlementInfrastructure: ISinglePriceRenewableSettlementInfrastructureService;

  constructor(readonly singlePriceRenewableSettlementInfrastructure: SinglePriceRenewableSettlementInfrastructureService) {
    this.iSinglePriceRenewableSettlementInfrastructure = singlePriceRenewableSettlementInfrastructure;
  }

  get(id: string) {
    return this.iSinglePriceRenewableSettlementInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iSinglePriceRenewableSettlementInfrastructure.get$(id);
  }

  list() {
    return this.iSinglePriceRenewableSettlementInfrastructure.list();
  }
  
  list$() {
    return this.iSinglePriceRenewableSettlementInfrastructure.list$();
  }
  
  listGroup() {
    return this.iSinglePriceRenewableSettlementInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iSinglePriceRenewableSettlementInfrastructure.listGroup$();
  }

  create(data: SinglePriceRenewableSettlement) {
    return this.iSinglePriceRenewableSettlementInfrastructure.create(data);
  }
}
