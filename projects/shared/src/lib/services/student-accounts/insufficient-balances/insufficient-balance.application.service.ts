import { InsufficientBalanceService } from './insufficient-balance.service';
import { Injectable } from '@angular/core';
import { InsufficientBalance } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class InsufficientBalanceApplicationService {
  constructor(private readonly insufficientBalance: InsufficientBalanceService) {}

  list(uid: string) {
    return this.insufficientBalance.list(uid);
  }

  list$(uid: string) {
    return this.insufficientBalance.list$(uid);
  }
}
