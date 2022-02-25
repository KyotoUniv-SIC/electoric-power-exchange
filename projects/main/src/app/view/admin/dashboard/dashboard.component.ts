import { BalanceData, MonthlyUsageData, OrderData } from '../../../page/admin/dashboard/dashboard.component';
import { Ranking } from '../../../page/dashboard/dashboard.component';
import { Order } from '../../../page/txs/txs.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
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
  balances?: BalanceData[] | null;
  @Input()
  totalBalanceData?: MultiDataSet | null;
  @Input()
  totalUsage?: MonthlyUsageData[] | null;
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
  orders?: OrderData[] | null;
  @Input()
  singlePriceNormal?: SinglePriceNormalSettlement | null;
  @Input()
  singlePriceNormalDate?: Date | null;
  @Input()
  singlePriceRenewable?: SinglePriceRenewableSettlement | null;
  @Input()
  singlePriceRenewableDate?: Date | null;
  @Output()
  appDownloadBalances: EventEmitter<BalanceData[]>;
  @Output()
  appDownloadOrders: EventEmitter<OrderData[]>;
  @Output()
  appDownloadUserUsages: EventEmitter<Ranking[]>;
  @Output()
  appDownloadMonthlyUsages: EventEmitter<MonthlyUsageData[]>;

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
    if (!this.orders) {
      alert('Order情報を取得できません');
      return;
    }
    this.appDownloadOrders.emit(this.orders);
  }
  onDownloadUserUsages() {
    if (!this.rankings) {
      alert('使用量情報を取得できません');
      return;
    }
    this.appDownloadUserUsages.emit(this.rankings);
  }
  onDownloadMonthlyUsages() {
    if (!this.totalUsage) {
      alert('使用量情報を取得できません');
      return;
    }
    this.appDownloadMonthlyUsages.emit(this.totalUsage);
  }
}
