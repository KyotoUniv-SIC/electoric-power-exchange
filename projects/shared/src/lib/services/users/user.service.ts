import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfrastructureService } from './user.infrastructure.service';
import { User } from '@local/common';

export interface IUserInfrastructureService {
  get(id: string): Promise<User | undefined>;
  get$(id: string): Observable<User | undefined>;
  list(): Promise<User[]>;
  list$(): Observable<User[]>;
  listGroup(): Promise<User[]>;
  listGroup$(): Observable<User[]>;
  create(data: User): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private iUserInfrastructure: IUserInfrastructureService;

  constructor(readonly userInfrastructure: UserInfrastructureService) {
    this.iUserInfrastructure = userInfrastructure;
  }

  get(id: string) {
    return this.iUserInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iUserInfrastructure.get$(id);
  }

  list() {
    return this.iUserInfrastructure.list();
  }
  
  list$() {
    return this.iUserInfrastructure.list$();
  }
  
  listGroup() {
    return this.iUserInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iUserInfrastructure.listGroup$();
  }

  create(data: User) {
    return this.iUserInfrastructure.create(data);
  }
}
