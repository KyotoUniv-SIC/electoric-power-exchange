import { AskInfrastructureService } from './ask.infrastructure.service';
import { Injectable } from '@angular/core';
import { Ask } from 'common/src/entities/asks';
import { Observable } from 'rxjs';

export interface IAskInfrastructureService {
  get(id: string): Promise<Ask | undefined>;
  get$(id: string): Observable<Ask | undefined>;
  list(): Promise<Ask[]>;
  list$(): Observable<Ask[]>;
  listGroup(): Promise<Ask[]>;
  listGroup$(): Observable<Ask[]>;
  create(data: Ask): Promise<void>;
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
