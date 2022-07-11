import { AccountPrivateService } from './account-private.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountPrivate } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class AccountPrivateApplicationService {
  constructor(
    private readonly accountPrivate: AccountPrivateService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
  ) {}

  async create(data: AccountPrivate) {
    const dialogRef = this.loadingDialog.open('Processing.');
    try {
      this.accountPrivate.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }
    this.snackBar.open('Successful create account. Please check your mailbox.', undefined, {
      duration: 6000,
    });
  }
}
