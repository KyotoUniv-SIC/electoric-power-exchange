import { Component, OnInit, Input } from '@angular/core';
import { User } from '@firebase/auth';
import { Balance, MonthlyPayment, StudentAccount } from '@local/common';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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
  @Input()
  usageData?: ChartDataSets[] | null;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barColors: Color[] = [
    {
      backgroundColor: '#6c8fb6',
    },
    {
      backgroundColor: '#b67cb6',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
