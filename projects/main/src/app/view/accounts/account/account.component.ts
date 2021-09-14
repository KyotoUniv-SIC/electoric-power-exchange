import { Component, OnInit, Input } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'view-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input()
  account?: proto.main.StudentAccount | null;
  @Input()
  usage?: proto.main.MonthlyUsage | null;
  @Input()
  balances?: any | null;

  constructor() {}

  ngOnInit(): void {}
}
