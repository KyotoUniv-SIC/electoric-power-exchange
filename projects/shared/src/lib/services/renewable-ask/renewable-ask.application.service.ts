import { RenewableAskService } from './renewable-ask.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RenewableAsk } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskApplicationService {
  constructor(
    private readonly renewableAsk: RenewableAskService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: RenewableAsk) {
    const dialogRef = this.loadingDialog.open('Sending Ask');
    try {
      this.renewableAsk.create(data);
    } catch {
      this.snackBar.open('Error has occured', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Ask', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['txs']);
  }

  list$(uid: string) {
    return this.renewableAsk.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
