import { ChatDeleteService } from './chat-delete.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatDelete } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class ChatDeleteApplicationService {
  constructor(
    private readonly chatDelete: ChatDeleteService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: ChatDelete) {
    const dialogRef = this.loadingDialog.open('Deleting Chat');
    try {
      this.chatDelete.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Delete Chat', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['chats']);
  }
}
