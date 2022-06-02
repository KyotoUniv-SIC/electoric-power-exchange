import { PrimaryAskService } from './primary-ask.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrimaryAsk } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class PrimaryAskApplicationService {
  constructor(
    private readonly primaryAsk: PrimaryAskService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: PrimaryAsk) {
    const dialogRef = this.loadingDialog.open('Requesting Ask Deletion');
    try {
      this.primaryAsk.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('UPX tokens of the same amount as the previous month usage were issued.', undefined, {
      duration: 6000,
    });
  }
}
