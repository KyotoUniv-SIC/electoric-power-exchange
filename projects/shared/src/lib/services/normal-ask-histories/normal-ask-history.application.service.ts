import { NormalAskHistoryService } from './normal-ask-history.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAskHistory } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NormalAskHistoryApplicationService {
  constructor(private readonly normalAskHistory: NormalAskHistoryService) {}

  get$(uid: string, id: string) {
    return this.normalAskHistory.get$(id).pipe(map((param) => (param?.account_id == uid ? param : undefined)));
  }

  list$(uid: string) {
    return this.normalAskHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }

  listAll() {
    return this.normalAskHistory.list();
  }

  listAll$() {
    return this.normalAskHistory.list$();
  }

  listYesterdayAll$() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.normalAskHistory
      .list$()
      .pipe(map((params) => params.filter((param) => (param.created_at as Timestamp).toDate() > yesterday)));
  }
}
