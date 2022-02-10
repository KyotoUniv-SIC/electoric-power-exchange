import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Message } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class MessageApplicationService {
  constructor(
    private readonly message: MessageService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: Message) {
    const dialogRef = this.loadingDialog.open('Creating Message');
    try {
      this.message.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Create Message', undefined, {
      duration: 6000,
    });
  }

  get$(chatID: string, id: string) {
    return this.message.get$(chatID, id);
  }

  list$(chatID: string) {
    return this.message.list$(chatID);
  }
}
