import { AdminAccountService } from './admin-account.service';
import { Injectable } from '@angular/core';
import { AdminAccount } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAccountApplicationService {
  constructor(private readonly adminAccount: AdminAccountService) {}

  list() {
    return this.adminAccount.list();
  }

  list$() {
    return this.adminAccount.list$();
  }

  getByNeme$(name: string) {
    return this.adminAccount.list$().pipe(map((admins) => admins.filter((admin) => (admin.name = name))));
  }
}
