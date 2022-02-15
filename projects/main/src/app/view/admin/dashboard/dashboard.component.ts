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
  appDownloadbalance: EventEmitter<Balance[]>;

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
    this.appDownloadbalance = new EventEmitter();
  }

  ngOnInit(): void {}

  onDownloadBalance() {
    if (!this.balances) {
      alert('Balance情報を取得できません');
      return;
    }
    this.appDownloadbalance.emit(this.balances);
  }
}
