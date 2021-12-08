import { RenewableAskHistoryService } from './renewable-ask-history.service';
import { Injectable } from '@angular/core';
import { RenewableAskHistory } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskHistoryApplicationService {
  constructor(private readonly renewableAskHistory: RenewableAskHistoryService) {}

  list$(uid: string) {
    return this.renewableAskHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
