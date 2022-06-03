import { MonthlyUsageData, OrderData } from '../../../page/admin/dashboard/dashboard.component';
import { Ranking } from '../../../page/dashboard/dashboard.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore/firebase';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Balance,
  NormalAsk,
  NormalAskHistory,
  NormalBid,
  NormalBidHistory,
  RenewableAsk,
  RenewableAskHistory,
  RenewableBid,
  RenewableBidHistory,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

export interface DateRange {
  data: any;
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
  balances?: Balance[] | null;
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
  @Input()
  normalBidHistories?: NormalBidHistory[] | null;
  @Input()
  normalAskHistories?: NormalAskHistory[] | null;
  @Input()
  renewableBidHistories?: RenewableBidHistory[] | null;
  @Input()
  renewableAskHistories?: RenewableAskHistory[] | null;

  @Output()
  appDownloadBalances: EventEmitter<Balance[]>;
  @Output()
  appDownloadOrders: EventEmitter<OrderData[]>;
  @Output()
  appDownloadUserUsages: EventEmitter<Ranking[]>;
  @Output()
  appDownloadMonthlyUsages: EventEmitter<MonthlyUsageData[]>;
  @Output()
  appDownloadNormalBids: EventEmitter<DateRange>;
  @Output()
  appDownloadNormalAsks: EventEmitter<DateRange>;
  @Output()
  appDownloadRenewableBids: EventEmitter<DateRange>;
  @Output()
  appDownloadRenewableAsks: EventEmitter<DateRange>;

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutColors: Color[] = [
    {
      backgroundColor: ['#6c8fb6', '#b67cb6'],
    },
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
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

  range = new FormGroup({
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

  onDownloadNormalBidHistories() {
    console.log(this.checked);
    const normalBids = this.checked ? this.normalBidHistories?.filter((bid) => bid.is_accepted) : this.normalBidHistories;
    const data = normalBids
      ?.filter((bid) => (bid.bid_created_at as Timestamp).toDate() > this.range.value.start)
      .filter((bid) => (bid.bid_created_at as Timestamp).toDate() < this.range.value.end);

    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    if (!data || !data.length) {
      alert('UPXのBidが存在しません');
      return;
    }
    this.appDownloadNormalBids.emit({ data, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadNormalAskHistories() {
    const normalAsks = this.checked ? this.normalAskHistories?.filter((ask) => ask.is_accepted) : this.normalAskHistories;
    const data = normalAsks
      ?.filter((ask) => (ask.ask_created_at as Timestamp).toDate() > this.range.value.start)
      .filter((ask) => (ask.ask_created_at as Timestamp).toDate() < this.range.value.end);

    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    if (!data || !data.length) {
      alert('UPXのAskが存在しません');
      return;
    }
    this.appDownloadNormalAsks.emit({ data, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadRenewableBidHistories() {
    const renewableBids = this.checked ? this.renewableBidHistories?.filter((bid) => bid.is_accepted) : this.renewableBidHistories;
    const data = renewableBids
      ?.filter((bid) => (bid.bid_created_at as Timestamp).toDate() > this.range.value.start)
      .filter((bid) => (bid.bid_created_at as Timestamp).toDate() < this.range.value.end);

    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    if (!data || !data.length) {
      alert('SPXのBidが存在しません');
      return;
    }
    this.appDownloadRenewableBids.emit({ data, start: this.range.value.start, end: this.range.value.end });
  }

  onDownloadRenewableAskHistories() {
    const renewableAsks = this.checked ? this.renewableAskHistories?.filter((ask) => ask.is_accepted) : this.renewableAskHistories;
    const data = renewableAsks
      ?.filter((ask) => (ask.ask_created_at as Timestamp).toDate() > this.range.value.start)
      .filter((ask) => (ask.ask_created_at as Timestamp).toDate() < this.range.value.end);

    if (!this.range.value.start || !this.range.value.end) {
      alert('範囲を正しく指定してください');
      return;
    }
    if (!data || !data.length) {
      alert('SPXのAskが存在しません');
      return;
    }
    this.appDownloadRenewableAsks.emit({ data, start: this.range.value.start, end: this.range.value.end });
  }
}
