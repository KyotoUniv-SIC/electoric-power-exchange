import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentAccountInfrastructureService } from './student-account.infrastructure.service';
import { StudentAccount } from '@local/common';

export interface IStudentAccountInfrastructureService {
  get(id: string): Promise<StudentAccount | undefined>;
  get$(id: string): Observable<StudentAccount | undefined>;
  list(): Promise<StudentAccount[]>;
  list$(): Observable<StudentAccount[]>;
  listGroup(): Promise<StudentAccount[]>;
  listGroup$(): Observable<StudentAccount[]>;
  create(data: StudentAccount): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class StudentAccountService {
  private iStudentAccountInfrastructure: IStudentAccountInfrastructureService;

  constructor(readonly studentAccountInfrastructure: StudentAccountInfrastructureService) {
    this.iStudentAccountInfrastructure = studentAccountInfrastructure;
  }

  get(id: string) {
    return this.iStudentAccountInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iStudentAccountInfrastructure.get$(id);
  }

  list() {
    return this.iStudentAccountInfrastructure.list();
  }
  
  list$() {
    return this.iStudentAccountInfrastructure.list$();
  }
  
  listGroup() {
    return this.iStudentAccountInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iStudentAccountInfrastructure.listGroup$();
  }

  create(data: StudentAccount) {
    return this.iStudentAccountInfrastructure.create(data);
  }
}
