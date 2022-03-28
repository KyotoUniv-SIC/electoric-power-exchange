import { Ranking } from '../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import { Balance, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';

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
  totalUsageAverage?: string | null;
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

  case1: boolean = false;
  case2: boolean = false;
  case3: boolean = false;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutColors: Color[] = [
    {
      backgroundColor: ['#6c8fb6', '#b67cb6'],
    },
  ];

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

  constructor() {
    if (this.balance?.amount_upx >= this.insufficiency) {
      this.case1 = true;
      const upx_balance = this.balance?.amount_upx - this.insufficiency;
      const spx_balance = this.balance?.amount_spx;
    } else if (this.insufficiency > balance?.amount_upx && balance?.amount_upx + balance?.amount_spx >= this.insufficiency) {
      this.case2 = true;
      const upx_balance = 0;
      const spx_balance = this.balance?.amount_upx + this.balance?.amount_spx - this.insufficiency;
    } else if (this.insufficiency > this.balance?.amount_spx + this.balance?.amount_upx) {
      this.case3 = true;
      const upx_balance = 0;
      const spx_balance = 0;
      const insufficient_balance = this.insufficiency - this.balance?.amount_spx - this.balance?.amount_upx;
    }
  }

  ngOnInit(): void {}
}
