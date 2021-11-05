import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Account } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class AccountApplicationService {
  
  constructor(private readonly account: AccountService) {}
}