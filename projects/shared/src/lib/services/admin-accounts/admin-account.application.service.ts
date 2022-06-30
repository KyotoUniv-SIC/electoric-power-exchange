import { AdminAccountService } from './admin-account.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAuthDialogComponent } from 'projects/main/src/app/view/dialogs/admin/admin-auth-dialog/admin-auth-dialog.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAccountApplicationService {
  constructor(private readonly adminAccount: AdminAccountService, private readonly dialog: MatDialog) {}

  list() {
    return this.adminAccount.list();
  }

  list$() {
    return this.adminAccount.list$();
  }

  getByName(name: string) {
    return this.adminAccount.list().then((admin) => admin.find((data) => data.name == name));
  }

  getByName$(name: string) {
    return this.adminAccount.list$().pipe(map((admins) => admins.filter((admin) => admin.name == name)));
  }

  async openAdminAuthDialog(): Promise<string> {
    const password: string = await this.dialog.open(AdminAuthDialogComponent).afterClosed().toPromise();
    return password;
  }
}
