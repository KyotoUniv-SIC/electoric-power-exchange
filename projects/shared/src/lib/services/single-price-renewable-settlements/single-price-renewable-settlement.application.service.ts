import { SinglePriceRenewableSettlementService } from './single-price-renewable-settlement.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { SinglePriceRenewableSettlement } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SinglePriceRenewableSettlementApplicationService {
  constructor(private readonly singlePriceRenewableSettlement: SinglePriceRenewableSettlementService) {}

  getLatest$() {
    return this.singlePriceRenewableSettlement.list$().pipe(
      map(
        (params) =>
          params.sort(function (first, second) {
            if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return 1;
            } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return -1;
            } else {
              return 0;
            }
          })[0],
      ),
    );
  }
  list$() {
    return this.singlePriceRenewableSettlement.list$();
  }

  listLatestMonth$() {
    return this.list$().pipe(
      map((params) =>
        params
          .sort(function (first, second) {
            if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return 1;
            } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return -1;
            } else {
              return 0;
            }
          })
          .slice(0, 30)
          .reverse(),
      ),
    );
  }
}
