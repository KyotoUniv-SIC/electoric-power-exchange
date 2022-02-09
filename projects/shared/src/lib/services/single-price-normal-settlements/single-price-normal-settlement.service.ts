import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SinglePriceNormalSettlementInfrastructureService } from './single-price-normal-settlement.infrastructure.service';
import { SinglePriceNormalSettlement } from '@local/common';

export interface ISinglePriceNormalSettlementInfrastructureService {
  get(id: string): Promise<SinglePriceNormalSettlement | undefined>;
  get$(id: string): Observable<SinglePriceNormalSettlement | undefined>;
  list(): Promise<SinglePriceNormalSettlement[]>;
  list$(): Observable<SinglePriceNormalSettlement[]>;
  listGroup(): Promise<SinglePriceNormalSettlement[]>;
  listGroup$(): Observable<SinglePriceNormalSettlement[]>;
  create(data: SinglePriceNormalSettlement): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class SinglePriceNormalSettlementService {
  private iSinglePriceNormalSettlementInfrastructure: ISinglePriceNormalSettlementInfrastructureService;

  constructor(readonly singlePriceNormalSettlementInfrastructure: SinglePriceNormalSettlementInfrastructureService) {
    this.iSinglePriceNormalSettlementInfrastructure = singlePriceNormalSettlementInfrastructure;
  }

  get(id: string) {
    return this.iSinglePriceNormalSettlementInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iSinglePriceNormalSettlementInfrastructure.get$(id);
  }

  list() {
    return this.iSinglePriceNormalSettlementInfrastructure.list();
  }
  
  list$() {
    return this.iSinglePriceNormalSettlementInfrastructure.list$();
  }
  
  listGroup() {
    return this.iSinglePriceNormalSettlementInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iSinglePriceNormalSettlementInfrastructure.listGroup$();
  }

  create(data: SinglePriceNormalSettlement) {
    return this.iSinglePriceNormalSettlementInfrastructure.create(data);
  }
}
