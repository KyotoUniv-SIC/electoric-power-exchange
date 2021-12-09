import { NormalAskHistoryService } from './normal-ask-history.service';
import { Injectable } from '@angular/core';
import { NormalAskHistory } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NormalAskHistoryApplicationService {
  constructor(private readonly normalAskHistory: NormalAskHistoryService) {}

  list$(uid: string) {
    return this.normalAskHistory.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
