import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAccountInfrastructureService } from './admin-account.infrastructure.service';
import { AdminAccount } from '@local/common';

export interface IAdminAccountInfrastructureService {
  get(id: string): Promise<AdminAccount | undefined>;
  get$(id: string): Observable<AdminAccount | undefined>;
  list(): Promise<AdminAccount[]>;
  list$(): Observable<AdminAccount[]>;
  listGroup(): Promise<AdminAccount[]>;
  listGroup$(): Observable<AdminAccount[]>;
  create(data: AdminAccount): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class AdminAccountService {
  private iAdminAccountInfrastructure: IAdminAccountInfrastructureService;

  constructor(readonly adminAccountInfrastructure: AdminAccountInfrastructureService) {
    this.iAdminAccountInfrastructure = adminAccountInfrastructure;
  }

  get(id: string) {
    return this.iAdminAccountInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iAdminAccountInfrastructure.get$(id);
  }

  list() {
    return this.iAdminAccountInfrastructure.list();
  }
  
  list$() {
    return this.iAdminAccountInfrastructure.list$();
  }
  
  listGroup() {
    return this.iAdminAccountInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iAdminAccountInfrastructure.listGroup$();
  }

  create(data: AdminAccount) {
    return this.iAdminAccountInfrastructure.create(data);
  }
}
