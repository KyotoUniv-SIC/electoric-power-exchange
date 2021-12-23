import { StudentAccountService } from './student-account.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentAccountApplicationService {
  constructor(private readonly studentAccount: StudentAccountService) {}

  list() {
    return this.studentAccount.list();
  }

  list$() {
    return this.studentAccount.list$();
  }
}
