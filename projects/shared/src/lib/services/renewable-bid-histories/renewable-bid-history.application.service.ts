import { RenewableBidHistoryService } from './renewable-bid-history.service';
import { Injectable } from '@angular/core';
import { RenewableBidHistory } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RenewableBidHistoryApplicationService {
  constructor(private readonly renewableBidHistory: RenewableBidHistoryService) {}

  list$(uid: string) {
    return this.renewableBidHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
