import { MessageDeleteService } from './message-delete.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageDelete } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class MessageDeleteApplicationService {
  constructor(
    private readonly messageDelete: MessageDeleteService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: MessageDelete) {
    const dialogRef = this.loadingDialog.open('Deleting Message');
    try {
      this.messageDelete.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Delete Message', undefined, {
      duration: 6000,
    });
  }
}
