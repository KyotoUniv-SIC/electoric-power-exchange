import { Component, OnInit, Input } from '@angular/core';
import { User } from '@firebase/auth';
import { Balance, MonthlyPayment, StudentAccount } from '@local/common';

@Component({
  selector: 'view-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  monthlyPayments?: MonthlyPayment[] | null;
  @Input()
  balance?: Balance | null;
  @Input()
  balances?: Balance | null;
  @Input()
  insufficiency?: number | null;
  @Input()
  amountUPX?: number | null;
  @Input()
  amountSPX?: number | null;
  @Input()
  amountInsufficiency?: number | null;
  constructor() {}

  ngOnInit(): void {}
}
