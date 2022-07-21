import { CO2Ranking, LastMonthDataSource, Ranking } from '../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import {
  DailyUsage,
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableRewardSetting,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import {
  balanceChartLabels,
  balanceColors,
  balanceChartType,
} from 'projects/shared/src/lib/services/charts/chart-balances/chart-balance.service';
import { contractChartType, contractChartLegend } from 'projects/shared/src/lib/services/charts/chart-contracts/chart-contract.service';

export interface PeriodicElement {
  usage: string;
  classification: string;
  unit: string;
  charge: number;
}

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
  latestUsage?: DailyUsage | null;
  @Input()
  withdrawDate?: Date | null;
  @Input()
  totalUsage?: number | null;
  @Input()
  totalUsageAverage?: string | null;
  @Input()
  rankings?: Ranking[] | null;
  @Input()
  rank?: number | null;
  @Input()
  co2Rank?: CO2Ranking | null;
  @Input()
  renewableRewardSetting?: RenewableRewardSetting | null;

  @Input()
  normalSettlement?: SinglePriceNormalSettlement | null;
  @Input()
  normalDate?: Date | null;
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
  renewableChartDates?: string[] | null;
  @Input()
  renewableChartOptions?: ChartOptions | null;
  @Input()
  normalOperationBids?: NormalBid[] | null;
  @Input()
  normalOperationAsks?: NormalAsk[] | null;
  @Input()
  renewableOperationAsks?: RenewableAsk[] | null;

  @Input()
  warning?: boolean | null;

  @Input()
  lastMonthDataSource?: LastMonthDataSource[] | null;

  doughnutChartLabels = balanceChartLabels;
  doughnutChartType = balanceChartType;
  doughnutColors = balanceColors;

  barChartType = contractChartType;
  barChartLegend = contractChartLegend;

  displayedColumns: string[] = ['classification', 'usage', 'unit', 'charge'];
  dataSource = [
    { classification: 'Minimum Charge', usage: 'Until the first 10 kWh', unit: 'Per Contract', charge: 341.01 },
    { classification: 'Energy Charge', usage: 'Over 10 kWh up to 120 kWh', unit: '1kWh', charge: 20.31 },
    { classification: 'Energy Charge', usage: 'Over 120 kWh up to 300 kWh', unit: '1kWh', charge: 25.71 },
    { classification: 'Energy Charge', usage: 'Over 300 kWh', unit: '1kWh', charge: 28.7 },
  ];

  lastMonthDisplayedColumns: string[] = ['classification', 'yourAccount', 'average'];

  constructor() {}

  ngOnInit(): void {}
}
