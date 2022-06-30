import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAccount } from '@local/common';
import { AdminAccountApplicationService } from 'projects/shared/src/lib/services/admin-accounts/admin-account.application.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-auth-dialog',
  templateUrl: './admin-auth-dialog.component.html',
  styleUrls: ['./admin-auth-dialog.component.css'],
})
export class AdminAuthDialogComponent implements OnInit {
  admin$: Observable<AdminAccount>;
  constructor(public matDialogRef: MatDialogRef<AdminAuthDialogComponent>, private readonly adminApp: AdminAccountApplicationService) {
    this.admin$ = this.adminApp.getByName$('admin').pipe(map((admins) => admins[0]));
  }

  ngOnInit(): void {}

  onClickButton(password: string): void {
    this.matDialogRef.close(password);
  }
}
