import { BalanceService } from './balance.service';
import { Injectable } from '@angular/core';
import { Balance } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BalanceApplicationService {
  constructor(private readonly balance: BalanceService) {}

  list$(uid: string) {
    return this.balance.list$(uid);
  }

  getByUid$(uid: string) {
    return this.balance.list$(uid).pipe(map((balances) => balances[0]));
  }
}
