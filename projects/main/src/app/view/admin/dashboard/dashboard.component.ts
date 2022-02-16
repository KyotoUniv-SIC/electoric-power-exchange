import { Ranking } from '../../../page/dashboard/dashboard.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Balance,
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableBid,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  balances?: Balance[] | null;
  @Input()
  totalBalanceData?: MultiDataSet | null;
  @Input()
  totalUsageThisYear?: number[] | null;
  @Input()
  totalUsageLastYear?: number[] | null;
  @Input()
  totalUsageData?: ChartDataSets[] | null;
  @Input()
  rankings?: Ranking[] | null;
  @Input()
  normalAsks?: NormalAsk[] | null;
  @Input()
  normalBids?: NormalBid[] | null;
  @Input()
  renewableAsks?: RenewableAsk[] | null;
  @Input()
  renewableBids?: RenewableBid[] | null;
  @Input()
  singlePriceNormal?: SinglePriceNormalSettlement | null;
  @Input()
  singlePriceNormalDate?: Date | null;
  @Input()
  singlePriceRenewable?: SinglePriceRenewableSettlement | null;
  @Input()
  singlePriceRenewableDate?: Date | null;
  @Output()
  appDownloadBalances: EventEmitter<Balance[]>;
  @Output()
  appDownloadOrders: EventEmitter<[NormalBid[], NormalAsk[], RenewableBid[], RenewableAsk[]]>;
  @Output()
  appDownloadUserUsages: EventEmitter<Ranking[]>;
  @Output()
  appDownloadMonthlyUsages: EventEmitter<[number[], number[]]>;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  constructor() {
    this.appDownloadBalances = new EventEmitter();
    this.appDownloadOrders = new EventEmitter();
    this.appDownloadUserUsages = new EventEmitter();
    this.appDownloadMonthlyUsages = new EventEmitter();
  }

  ngOnInit(): void {}

  onDownloadBalances() {
    if (!this.balances) {
      alert('Balance情報を取得できません');
      return;
    }
    this.appDownloadBalances.emit(this.balances);
  }
  onDownloadOrders() {
    if (!this.normalAsks || !this.normalBids || !this.renewableAsks || !this.renewableBids) {
      alert('Order情報を取得できません');
      return;
    }
    this.appDownloadOrders.emit([this.normalBids, this.normalAsks, this.renewableBids, this.renewableAsks]);
  }
  onDownloadUserUsages() {
    if (!this.rankings) {
      alert('使用量情報を取得できません');
      return;
    }
    this.appDownloadUserUsages.emit(this.rankings);
  }
  onDownloadMonthlyUsages() {
    if (!this.totalUsageThisYear || !this.totalUsageLastYear) {
      alert('使用量情報を取得できません');
      return;
    }
    this.appDownloadMonthlyUsages.emit([this.totalUsageThisYear, this.totalUsageLastYear]);
  }
}
