import { NormalBidHistoryService } from './normal-bid-history.service';
import { Injectable } from '@angular/core';
import { NormalBidHistory } from '@local/common';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NormalBidHistoryApplicationService {
  constructor(private readonly normalBidHistory: NormalBidHistoryService) {}

  get$(uid: string, id: string) {
    return this.normalBidHistory.get$(id).pipe(map((param) => (param?.account_id == uid ? param : undefined)));
  }
  list$(uid: string) {
    return this.normalBidHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
