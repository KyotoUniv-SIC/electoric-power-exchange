import { Component, Input, OnInit } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  account?: proto.main.StudentAccount | null;
  @Input()
  usage?: proto.main.MonthlyUsage | null;
  @Input()
  balances?: any | null;

  constructor() {}

  ngOnInit(): void {}
}
