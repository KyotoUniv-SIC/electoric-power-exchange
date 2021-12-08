import { NormalBidHistoryService } from './normal-bid-history.service';
import { Injectable } from '@angular/core';
import { NormalBidHistory } from '@local/common';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NormalBidHistoryApplicationService {
  constructor(private readonly normalBidHistory: NormalBidHistoryService) {}

  list$(uid: string) {
    return this.normalBidHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
