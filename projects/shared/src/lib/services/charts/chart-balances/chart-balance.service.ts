import { Injectable } from '@angular/core';
import { Balance } from '@local/common';
import { ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export const balanceChartLabels: Label[] = ['UPX', 'SPX'];
export const balanceChartType: ChartType = 'doughnut';
export const balanceColors: Color[] = [
  {
    backgroundColor: ['#6c8fb6', '#b67cb6'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChartBalanceService {
  constructor() {}
  createBalanceDonutChartData(balance: Balance) {
    return [[parseInt(balance.amount_uupx) / 1000000, parseInt(balance.amount_uspx) / 1000000]];
  }
}
