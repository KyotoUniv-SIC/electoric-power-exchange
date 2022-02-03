import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Chat } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatApplicationService {
  constructor(
    private readonly chat: ChatService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: Chat) {
    const dialogRef = this.loadingDialog.open('Creating Chat');
    try {
      this.chat.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Create Chat', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['chats']);
  }

  get$(id: string) {
    return this.chat.get$(id);
  }

  list$(uid: string) {
    return this.chat.list$().pipe(map((params) => params.filter((param) => param.user1 == uid || param.user2 == uid)));
  }
}
