import { RenewableAskDeleteService } from './renewable-ask-delete.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RenewableAskDelete } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskDeleteApplicationService {
  constructor(
    private readonly renewableAskDelete: RenewableAskDeleteService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: RenewableAskDelete) {
    const dialogRef = this.loadingDialog.open('Requesting Ask Deletion');
    try {
      this.renewableAskDelete.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Delete Ask. It takes a minute to reflect', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['txs']);
  }
}
