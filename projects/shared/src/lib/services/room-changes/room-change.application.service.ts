import { RoomChangeService } from './room-change.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomChange } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class RoomChangeApplicationService {
  constructor(
    private readonly roomChange: RoomChangeService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
  ) {}

  async create(data: RoomChange) {
    const dialogRef = this.loadingDialog.open('Sending Ask');
    try {
      this.roomChange.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successful change', undefined, {
      duration: 6000,
    });
  }
}
