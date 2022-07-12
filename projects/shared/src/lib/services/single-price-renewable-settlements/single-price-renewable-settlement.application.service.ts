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
            .find((params) => params.amount_uspx != '0')!,
      ),
    );
  }
  list$() {
    return this.singlePriceRenewableSettlement.list$();
  }

  listLatestMonth$() {
    const first = new Date();
    first.setMonth(first.getMonth() - 1);
    first.setDate(1);
    first.setHours(0, 0, 0, 0);
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
          .filter((params) => (params.created_at as Timestamp).toDate() > first)
          .reverse(),
      ),
    );
  }
}
