import { SinglePriceNormalSettlementService } from './single-price-normal-settlement.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { SinglePriceNormalSettlement } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SinglePriceNormalSettlementApplicationService {
  constructor(private readonly singlePriceNormalSettlement: SinglePriceNormalSettlementService) {}

  getLatest$() {
    return this.singlePriceNormalSettlement.list$().pipe(
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
    return this.singlePriceNormalSettlement.list$();
  }
}
