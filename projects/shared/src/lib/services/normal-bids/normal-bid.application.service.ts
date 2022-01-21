import { NormalBidService } from './normal-bid.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NormalBid } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';
import { map } from 'rxjs/operators';

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
      this.snackBar.open('Error has occurred', undefined, {
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

  get$(uid: string, id: string) {
    return this.normalBid.get$(id).pipe(map((param) => (param?.account_id == uid ? param : undefined)));
  }

  list$(uid: string) {
    return this.normalBid.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
