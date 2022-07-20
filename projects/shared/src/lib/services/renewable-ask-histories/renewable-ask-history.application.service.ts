import { RenewableAskHistoryService } from './renewable-ask-history.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { RenewableAskHistory } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskHistoryApplicationService {
  constructor(private readonly renewableAskHistory: RenewableAskHistoryService) {}

  get$(uid: string, id: string) {
    return this.renewableAskHistory.get$(id).pipe(map((param) => (param?.account_id == uid ? param : undefined)));
  }

  list$(uid: string) {
    return this.renewableAskHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }

  listAll() {
    return this.renewableAskHistory.list();
  }

  listAll$() {
    return this.renewableAskHistory.list$();
  }

  listYesterdayAll$() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.renewableAskHistory
      .list$()
      .pipe(map((params) => params.filter((param) => (param.created_at as Timestamp).toDate() > yesterday)));
  }
}
