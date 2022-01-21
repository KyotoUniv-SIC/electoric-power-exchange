import { NormalBidDeleteService } from './normal-bid-delete.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NormalBidDelete } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class NormalBidDeleteApplicationService {
  constructor(
    private readonly normalBidDelete: NormalBidDeleteService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: NormalBidDelete) {
    const dialogRef = this.loadingDialog.open('Requesting Bid Deletion');
    try {
      this.normalBidDelete.create(data);
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
