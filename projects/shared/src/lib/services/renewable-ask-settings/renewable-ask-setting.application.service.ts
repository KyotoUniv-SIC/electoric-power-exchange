import { RenewableAskSettingService } from './renewable-ask-setting.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RenewableAskSetting } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskSettingApplicationService {
  constructor(
    private readonly renewableAskSetting: RenewableAskSettingService,
    private readonly loadingDialog: LoadingDialogService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  async create(data: RenewableAskSetting) {
    const dialogRef = this.loadingDialog.open('Sending New Setting');
    try {
      this.renewableAskSetting.create(data);
    } catch {
      this.snackBar.open('Error has occurred', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('Successfully Update Setting', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['admin/tokens']);
  }

  get$(id: string) {
    return this.renewableAskSetting.get$(id);
  }

  getLatest$() {
    return this.renewableAskSetting.list$().pipe(
      map(
        (settings) =>
          settings.sort(function (first, second) {
            if (!first.created_at) {
              return 1;
            } else if (!second.created_at) {
              return -1;
            } else {
              if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
                return -1;
              } else if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
                return 1;
              } else {
                return 0;
              }
            }
          })[0],
      ),
    );
  }

  list$() {
    return this.renewableAskSetting.list$();
  }
}
