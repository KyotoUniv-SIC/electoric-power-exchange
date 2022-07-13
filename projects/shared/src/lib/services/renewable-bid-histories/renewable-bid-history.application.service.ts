import { RenewableBidHistoryService } from './renewable-bid-history.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { RenewableBidHistory } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RenewableBidHistoryApplicationService {
  constructor(private readonly renewableBidHistory: RenewableBidHistoryService) {}

  get$(uid: string, id: string) {
    return this.renewableBidHistory.get$(id).pipe(map((param) => (param?.account_id == uid ? param : undefined)));
  }

  list$(uid: string) {
    return this.renewableBidHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }

  listAll$() {
    return this.renewableBidHistory.list$();
  }

  listYesterdayAll$() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.renewableBidHistory
      .list$()
      .pipe(map((params) => params.filter((param) => (param.created_at as Timestamp).toDate() > yesterday)));
  }
}
