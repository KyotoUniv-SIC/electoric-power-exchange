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
  singlePriceNormal?: SinglePriceNormalSettlement | null;
  @Input()
  singlePriceNormalDate?: Date | null;
  @Input()
  singlePriceRenewable?: SinglePriceRenewableSettlement | null;
  @Input()
  singlePriceRenewableDate?: Date | null;
  @Input()
  singlePriceNormalList?: SinglePriceNormalSettlement[] | null;
  @Input()
  singlePriceRenewableList?: SinglePriceRenewableSettlement[] | null;
  @Input()
  singlePriceNormalListData?: ChartDataSets[] | null;
  @Input()
  singlePriceNormalListDate?: string[] | null;
  @Input()
  singlePriceRenewableListData?: ChartDataSets[] | null;
  @Input()
  singlePriceRenewableListDate?: string[] | null;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutColors: Color[] = [
    {
      backgroundColor: ['#6c8fb6', '#b67cb6'],
    },
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          id: 'y-axis-price', // Y軸のID
          type: 'linear', // linear固定
          position: 'left', // どちら側に表示される軸か？
          ticks: {
            // スケール
            max: 40,
            min: 10,
            stepSize: 10,
          },
        },
        {
          id: 'y-axis-amount',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 50,
            min: 0,
            stepSize: 10,
          },
          gridLines: {
            // 2つ目の軸のグリッド削除
            drawOnChartArea: false,
          },
        },
      ],
    },
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
