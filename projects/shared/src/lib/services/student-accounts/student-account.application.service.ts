import { StudentAccountService } from './student-account.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentAccountApplicationService {
  constructor(private readonly studentAccount: StudentAccountService) {}

  get(id: string) {
    return this.studentAccount.get(id);
  }

  get$(id: string) {
    return this.studentAccount.get$(id);
  }

  list() {
    return this.studentAccount.list();
  }

  list$() {
    return this.studentAccount.list$();
  }

  getByUid$(uid: string) {
    return this.studentAccount
      .list$()
      .pipe(map((studentAccounts) => studentAccounts.filter((studentAccount) => studentAccount.user_ids?.some((id) => id == uid))[0]));
  }
}
