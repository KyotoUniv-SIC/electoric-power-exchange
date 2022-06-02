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
  balances?: Balance | null;
  @Input()
  monthlyPayments?: MonthlyPayment[] | null;
  @Input()
  uupxAmount?: number | null;
  @Input()
  uspxAmount?: number | null;
  @Input()
  insufficiencyAmount?: number | null;

  constructor() {}

  ngOnInit(): void {}
}
