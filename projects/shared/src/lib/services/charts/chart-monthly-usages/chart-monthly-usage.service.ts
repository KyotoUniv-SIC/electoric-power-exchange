import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DailyUsage, MonthlyUsage } from '@local/common';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export const usageChartOptions: ChartOptions = {
  responsive: true,
};
export const usageChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const usageChartType: ChartType = 'bar';
export const usageChartLegend = true;
export const usageChartPlugins = [];
export const usageColors: Color[] = [
  {
    backgroundColor: '#6c8fb6',
  },
  {
    backgroundColor: '#b67cb6',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChartMonthlyUsageService {
  constructor() {}
  createMonthlyUsageChartDataSets(dailyUsages: DailyUsage[], monthlyUsages: MonthlyUsage[]) {
    const now = new Date();
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    let totalUsage = 0;
    for (const usage of dailyUsages) {
      (usage.created_at as Timestamp).toDate() > firstDay ? (totalUsage += parseInt(usage.amount_kwh_str)) : totalUsage;
    }
    let dataThisYear = monthlyUsages
      .filter((usage) => parseInt(usage.year) == now.getFullYear())
      .sort((first, second) => parseInt(first.month) - parseInt(second.month));
    // .getMonth() 与えた日付の「月」を表す 0 から 11 までの間の整数値
    let lackBefore = !dataThisYear.length ? now.getMonth() : parseInt(dataThisYear[0].month) - 1;
    let lackAfter = !dataThisYear.length ? 11 - now.getMonth() : 12 - parseInt(dataThisYear[dataThisYear.length - 1].month);
    // 前月以前のデータに0を入れる
    for (let i = 0; i < lackBefore; i++) {
      dataThisYear.unshift(new MonthlyUsage({ amount_mwh: '0' }));
    }
    // 今月のデータを追加
    dataThisYear.push(new MonthlyUsage({ amount_mwh: (totalUsage * 1000000).toString() }));
    // 来月以降のデータに0を入れる
    for (let i = 0; i < lackAfter; i++) {
      dataThisYear.push(new MonthlyUsage({ amount_mwh: '0' }));
    }
    const usagesThisYear = dataThisYear.map((usage) => parseInt(usage.amount_mwh) / 1000000);

    let usagesPreviousYear = monthlyUsages
      .filter((usage) => parseInt(usage.year) == now.getFullYear() - 1)
      .sort((first, second) => parseInt(first.month) - parseInt(second.month))
      .map((usage) => parseInt(usage.amount_mwh) / 1000000);
    let lack = 12 - usagesPreviousYear.length;
    for (let i = 0; i < lack; i++) {
      usagesPreviousYear.unshift(0);
    }

    return [
      { data: usagesThisYear, label: 'This year' },
      { data: usagesPreviousYear, label: 'Last year' },
    ];
  }

  createAllMonthlyUsageChartDataSets(usages: DailyUsage[]) {
    const now = new Date();
    let totalUsageThisYear: number[] = [];
    let totalUsageLastYear: number[] = [];
    for (let i = 0; i < 12; i++) {
      const thisMonth = new Date(now.getFullYear(), i, 1);
      const nextMonth = new Date(now.getFullYear(), i + 1, 1);
      const thisMonthLastYear = new Date(now.getFullYear() - 1, i, 1);
      const nextMonthLastYear = new Date(now.getFullYear() - 1, i + 1, 1);
      const usage = usages.reduce(
        (sum, element) =>
          thisMonth < (element.created_at as Timestamp).toDate() && (element.created_at as Timestamp).toDate() < nextMonth
            ? sum + parseInt(element.amount_kwh_str)
            : sum,
        0,
      );
      const usageLastYear = usages.reduce(
        (sum, element) =>
          thisMonthLastYear < (element.created_at as Timestamp).toDate() && (element.created_at as Timestamp).toDate() < nextMonthLastYear
            ? sum + parseInt(element.amount_kwh_str)
            : sum,
        0,
      );
      totalUsageThisYear.push(usage);
      totalUsageLastYear.push(usageLastYear);
    }
    const dataSets = [
      { data: totalUsageThisYear, label: 'This year' },
      { data: totalUsageLastYear, label: 'Last year' },
    ];
    return dataSets;
  }
}
