import { Component, Input, OnInit } from '@angular/core';
import { Balance, proto } from '@local/common';
import { ChartType } from 'chart.js';
import { balance } from 'functions/src/balances';
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

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartData: MultiDataSet = [[this.balances?.amount_upx, this.balances?.amount_spx]];
  doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}
}
