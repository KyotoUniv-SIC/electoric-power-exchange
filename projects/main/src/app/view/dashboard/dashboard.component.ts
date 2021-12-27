import { Ranking } from '../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import { Balance, proto } from '@local/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  balances?: Balance | null;
  @Input()
  totalUsage?: number | null;
  @Input()
  usages?: number[] | null;
  @Input()
  usagesPreviousYear?: number[] | null;
  @Input()
  rankings?: Ranking[] | null;
  @Input()
  rank?: number | null;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartData: MultiDataSet = [
    [
      // this.balances?.amount_upx, this.balances?.amount_spx
      100, 100,
    ],
  ];
  doughnutChartType: ChartType = 'doughnut';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [100, 200, 70, 600, 450, 300, 50, 533, 66, 54], label: 'This year' },
    { data: [33, 100, 200, 70, 600, 450, 300, 50, 533, 66, 54, 554], label: 'Last year' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
