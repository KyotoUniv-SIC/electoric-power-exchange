import { Component, OnInit, Input } from '@angular/core';
import { User } from '@firebase/auth';
import { Balance, MonthlyPayment, StudentAccount } from '@local/common';
import { ChartDataSets } from 'chart.js';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';
import {
  usageChartLabels,
  usageChartLegend,
  usageChartOptions,
  usageChartPlugins,
  usageChartType,
  usageColors,
} from 'projects/shared/src/lib/services/charts/chart-monthly-usages/chart-monthly-usage.service';

@Component({
  selector: 'view-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  balances?: Balance | null;
  @Input()
  monthlyPayments?: MonthlyPayment[] | null;
  @Input()
  uupxAmount?: number | null;
  @Input()
  uspxAmount?: number | null;
  @Input()
  insufficiencyAmount?: number | null;
  @Input()
  usageData?: ChartDataSets[] | null;

  barChartOptions = usageChartOptions;
  barChartLabels = usageChartLabels;
  barChartType = usageChartType;
  barChartLegend = usageChartLegend;
  barChartPlugins = usageChartPlugins;
  barColors = usageColors;

  constructor(private readonly authApp: AuthApplicationService) {}

  ngOnInit(): void {}

  onVerifiedEmail() {
    alert('メールアドレスは確認済みです');
  }

  async onConfirmEmail() {
    await this.authApp.confirmEmail();
    alert('確認メールを再送信しました');
  }
}
