import { Ranking } from '../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import { Balance, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  balance?: Balance | null;
  @Input()
  balanceData?: MultiDataSet | null;
  @Input()
  totalBalanceData?: MultiDataSet | null;
  @Input()
  insufficiency?: number | null;
  @Input()
  totalUsage?: number | null;
  @Input()
  totalUsageAverage?: number | null;
  @Input()
  usageData?: ChartDataSets[] | null;
  @Input()
  rankings?: Ranking[] | null;
  @Input()
  rank?: number | null;
  @Input()
  singlePriceNormal?: SinglePriceNormalSettlement | null;
  @Input()
  singlePriceNormalDate?: Date | null;
  @Input()
  singlePriceRenewable?: SinglePriceRenewableSettlement | null;
  @Input()
  singlePriceRenewableDate?: Date | null;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  // balanceData: MultiDataSet = [
  //   [
  //     // this.balance?.amount_upx, this.balance?.amount_spx
  //     100, 100,
  //   ],
  // ];
  // totalBalanceData: MultiDataSet = [
  //   [
  //     // this.totalBalance?.amount_upx, this.totalBalance?.amount_spx
  //     20000, 54000,
  //   ],
  // ];

  // barChartData: ChartDataSets[] = [
  //   { data: [100, 200, 70, 600, 450, 300, 50, 533, 66, 54], label: 'This year' },
  //   { data: [33, 100, 200, 70, 600, 450, 300, 50, 533, 66, 54, 554], label: 'Last year' },
  // ];

  constructor() {}

  ngOnInit(): void {}
}
