import { AvailableBalanceService } from './available-balance.service';
import { Injectable } from '@angular/core';
import { AvailableBalance } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AvailableBalanceApplicationService {
  constructor(private readonly availableBalance: AvailableBalanceService) {}

  list$(uid: string) {
    return this.availableBalance.list$(uid).pipe(map((balances) => balances[0]));
  }
}
