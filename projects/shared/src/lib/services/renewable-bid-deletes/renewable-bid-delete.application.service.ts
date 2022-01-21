import { RenewableBidDeleteService } from './renewable-bid-delete.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RenewableBidDelete } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class RenewableBidDeleteApplicationService {
  constructor(
    private readonly renewableBidDelete: RenewableBidDeleteService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: RenewableBidDelete) {
    const dialogRef = this.loadingDialog.open('Requesting Bid Deletion');
    try {
      this.renewableBidDelete.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Delete Bid. It takes a minute to reflect', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['txs']);
  }
}
