import { RenewableBidHistoryService } from './renewable-bid-history.service';
import { Injectable } from '@angular/core';
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
}
