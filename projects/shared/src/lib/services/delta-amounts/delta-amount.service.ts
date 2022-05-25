import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeltaAmountInfrastructureService } from './delta-amount.infrastructure.service';
import { DeltaAmount } from '@local/common';

export interface IDeltaAmountInfrastructureService {
  get(id: string): Promise<DeltaAmount | undefined>;
  get$(id: string): Observable<DeltaAmount | undefined>;
  list(): Promise<DeltaAmount[]>;
  list$(): Observable<DeltaAmount[]>;
  listGroup(): Promise<DeltaAmount[]>;
  listGroup$(): Observable<DeltaAmount[]>;
  create(data: DeltaAmount): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class DeltaAmountService {
  private iDeltaAmountInfrastructure: IDeltaAmountInfrastructureService;

  constructor(readonly deltaAmountInfrastructure: DeltaAmountInfrastructureService) {
    this.iDeltaAmountInfrastructure = deltaAmountInfrastructure;
  }

  get(id: string) {
    return this.iDeltaAmountInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iDeltaAmountInfrastructure.get$(id);
  }

  list() {
    return this.iDeltaAmountInfrastructure.list();
  }
  
  list$() {
    return this.iDeltaAmountInfrastructure.list$();
  }
  
  listGroup() {
    return this.iDeltaAmountInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iDeltaAmountInfrastructure.listGroup$();
  }

  create(data: DeltaAmount) {
    return this.iDeltaAmountInfrastructure.create(data);
  }
}
