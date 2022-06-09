import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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

  barChartOptions: ChartOptions = {
    responsive: true,
  };
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
