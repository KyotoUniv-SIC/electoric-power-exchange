import { OrderData } from '../../../page/admin/dashboard/dashboard.component';
import { Ranking } from '../../../page/dashboard/dashboard.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableBid,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import {
  usageChartLabels,
  usageChartLegend,
  usageChartOptions,
  usageChartPlugins,
  usageChartType,
  usageColors,
} from 'projects/shared/src/lib/services/charts/chart-monthly-usages/chart-monthly-usage.service';

export interface historyOption {
  onlyContracted: boolean;
  start: Date;
  end: Date;
}

export interface DateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
  appDownloadBalances: EventEmitter<{}>;
  @Output()
  appDownloadOrders: EventEmitter<OrderData[]>;
  @Output()
  appDownloadUserUsages: EventEmitter<Ranking[]>;
  @Output()
  appDownloadMonthlyUsages: EventEmitter<ChartDataSets[]>;
  @Output()
  appDownloadNormalBids: EventEmitter<historyOption>;
  @Output()
  appDownloadNormalAsks: EventEmitter<historyOption>;
  @Output()
  appDownloadRenewableBids: EventEmitter<historyOption>;
  @Output()
  appDownloadRenewableAsks: EventEmitter<historyOption>;
  @Output()
  appDownloadUsages: EventEmitter<DateRange>;
  @Output()
  appDownloadPayments: EventEmitter<DateRange>;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutColors: Color[] = [
    {
      backgroundColor: ['#6c8fb6', '#b67cb6'],
    },
  ];

  barChartOptions = usageChartOptions;
  barChartLabels = usageChartLabels;
  barChartType = usageChartType;
  barChartLegend = usageChartLegend;
  barChartPlugins = usageChartPlugins;
  barColors = usageColors;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  usageRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  checked: boolean = false;

  constructor() {
    this.appDownloadBalances = new EventEmitter();
    this.appDownloadOrders = new EventEmitter();
    this.appDownloadUserUsages = new EventEmitter();
    this.appDownloadMonthlyUsages = new EventEmitter();
    this.appDownloadNormalBids = new EventEmitter();
    this.appDownloadNormalAsks = new EventEmitter();
    this.appDownloadRenewableBids = new EventEmitter();
    this.appDownloadRenewableAsks = new EventEmitter();
    this.appDownloadUsages = new EventEmitter();
    this.appDownloadPayments = new EventEmitter();
  }

  ngOnInit(): void {}

  onDownloadBalances() {
    this.appDownloadBalances.emit();
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
    if (!this.totalUsageData) {
      alert('使用量情報を取得できません');
      return;
    }
    this.appDownloadMonthlyUsages.emit(this.totalUsageData);
  }

  onDownloadNormalBidHistories() {
    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    this.appDownloadNormalBids.emit({ onlyContracted: this.checked, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadNormalAskHistories() {
    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    this.appDownloadNormalAsks.emit({ onlyContracted: this.checked, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadRenewableBidHistories() {
    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    this.appDownloadRenewableBids.emit({ onlyContracted: this.checked, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadRenewableAskHistories() {
    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    this.appDownloadRenewableAsks.emit({ onlyContracted: this.checked, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadUsages() {
    if (!this.usageRange.value.start || !this.usageRange.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    this.appDownloadUsages.emit({ start: this.usageRange.value.start, end: this.usageRange.value.end });
  }

  onDownloadPayments() {
    if (!this.usageRange.value.start || !this.usageRange.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    this.appDownloadPayments.emit({ start: this.usageRange.value.start, end: this.usageRange.value.end });
  }
}
