import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { contractChartLegend, contractChartType } from 'projects/shared/src/lib/services/charts/chart-contracts/chart-contract.service';

@Component({
  selector: 'view-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @Input()
  normalChartDataSets?: ChartDataSets[] | null;
  @Input()
  normalChartDates?: string[] | null;
  @Input()
  normalChartOptions?: ChartOptions | null;

  @Input()
  renewableChartDataSets?: ChartDataSets[] | null;
  @Input()
  renewableChartDates?: string[] | null;
  @Input()
  renewableChartOptions?: ChartOptions | null;

  barChartType = contractChartType;
  barChartLegend = contractChartLegend;

  constructor() {}

  ngOnInit(): void {}
}
