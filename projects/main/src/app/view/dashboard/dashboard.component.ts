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
  balanceData?: MultiDataSet | null;
  @Input()
  totalBalanceData?: MultiDataSet | null;
  @Input()
  amountUPX?: number | null;
  @Input()
  amountSPX?: number | null;
  @Input()
  amountInsufficiency?: number | null;
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
  normalSettlement?: SinglePriceNormalSettlement | null;
  @Input()
  normalDate?: Date | null;
  @Input()
  normalSettlements?: SinglePriceNormalSettlement[] | null;
  @Input()
  normalChartDataSets?: ChartDataSets[] | null;
  @Input()
  normalChartDates?: string[] | null;
  @Input()
  normalChartOptions?: ChartOptions | null;

  @Input()
  renewableSettlement?: SinglePriceRenewableSettlement | null;
  @Input()
  renewableDate?: Date | null;
  @Input()
  renewableChartDataSets?: ChartDataSets[] | null;
  @Input()
  renewableSettlements?: SinglePriceRenewableSettlement[] | null;
  @Input()
  renewableChartDates?: string[] | null;
  @Input()
  renewableChartOptions?: ChartOptions | null;

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

  constructor() {}

  ngOnInit(): void {}
}
