import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { proto } from '@local/common';
import * as Long from 'long';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  account$: Observable<proto.main.StudentAccount | undefined>;
  usage$: Observable<proto.main.MonthlyUsage | undefined>;
  balances$: Observable<any | undefined>;

  constructor(private route: ActivatedRoute) {
    this.account$ = of(
      new proto.main.StudentAccount({
        id: 'testID',
        name: 'testName',
        payment_method: 'xrp',
        xrp_address: 'rpct6vuKL2bcJq9FFygAsYNMVXyXirwPeL',
      }),
    );

    this.usage$ = of(
      new proto.main.MonthlyUsage({
        id: 'testUsage',
        student_account_id: 'testID',
        amount_kwh: 2000,
      }),
    );

    this.balances$ = of([
      {
        amount: 200,
        denom: 'upx',
      },
      {
        amount: 100,
        denom: 'spx',
      },
    ]);
  }

  ngOnInit(): void {}
}
