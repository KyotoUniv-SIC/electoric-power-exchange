import { BalanceService } from './balance.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Balance } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BalanceApplicationService {
  constructor(private readonly balance: BalanceService) {}

  list(uid: string) {
    return this.balance.list(uid).then((balances) =>
      balances.sort(function (first, second) {
        if (!first.created_at) {
          return 1;
        } else if (!second.created_at) {
          return -1;
        } else {
          if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
            return 1;
          } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
            return -1;
          } else {
            return 0;
          }
        }
      }),
    );
  }

  list$(uid: string) {
    return this.balance.list$(uid).pipe(
      map((balances) =>
        balances.sort(function (first, second) {
          if (!first.created_at) {
            return 1;
          } else if (!second.created_at) {
            return -1;
          } else {
            if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
              return 1;
            } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
              return -1;
            } else {
              return 0;
            }
          }
        }),
      ),
    );
  }

  getByUid$(uid: string) {
    return this.balance.list$(uid).pipe(
      map(
        (balances) =>
          balances.sort(function (first, second) {
            if (!first.created_at) {
              return 1;
            } else if (!second.created_at) {
              return -1;
            } else {
              if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
                return 1;
              } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
                return -1;
              } else {
                return 0;
              }
            }
          })[0],
      ),
    );
  }
}
