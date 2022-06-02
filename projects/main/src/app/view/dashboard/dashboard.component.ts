import { Ranking } from '../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import { Balance, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';

export interface PeriodicElement {
  usage: string;
  classification: string;
  unit: string;
  charge: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { classification: 'Minimum Charge', usage: 'Until the first 10 kWh', unit: 'Per Contract', charge: 341.01 },
  { classification: 'Energy Charge', usage: 'Over 10 kWh up to 120 kWh', unit: '1kWh', charge: 20.31 },
  { classification: 'Energy Charge', usage: 'Over 120 kWh up to 300 kWh', unit: '1kWh', charge: 25.71 },
  { classification: 'Energy Charge', usage: 'Over 300 kWh', unit: '1kWh', charge: 28.7 },
];

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
  uupxAmount?: number | null;
  @Input()
  uspxAmount?: number | null;
  @Input()
  insufficiencyAmount?: number | null;
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

  displayedColumns: string[] = ['classification', 'usage', 'unit', 'charge'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
