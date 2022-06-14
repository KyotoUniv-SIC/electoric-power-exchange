import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Balance, StudentAccount } from '@local/common';

@Component({
  selector: 'view-xrpl',
  templateUrl: './xrpl.component.html',
  styleUrls: ['./xrpl.component.css'],
})
export class XrplComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  balances?: Balance | null;
  @Input()
  xrpLedger?: any | null;
  @Input()
  trustLine?: any | null;

  constructor() {}

  ngOnInit(): void {}

  calcMicroAmount(amount: any) {
    return Number(amount) * 10 ** -6;
  }
}
