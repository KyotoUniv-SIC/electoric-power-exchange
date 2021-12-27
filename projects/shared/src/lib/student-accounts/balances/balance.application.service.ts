import { Injectable } from '@angular/core';
import { BalanceService } from './balance.service';
import { Balance } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class BalanceApplicationService {
  
  constructor(private readonly balance: BalanceService) {}
}