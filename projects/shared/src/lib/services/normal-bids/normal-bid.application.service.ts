import { NormalBidService } from './normal-bid.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NormalBid } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class NormalBidApplicationService {
  constructor(
    private readonly normalBid: NormalBidService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: NormalBid) {
    const dialogRef = this.loadingDialog.open('Sending Bid');
    try {
      this.normalBid.create(data);
    } catch {
      this.snackBar.open('Error has occured', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Bid', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['txs']);
  }
}
