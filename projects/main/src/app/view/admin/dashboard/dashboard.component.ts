import { Ranking } from '../../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import {
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableBid,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  totalBalanceData?: MultiDataSet | null;
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

  doughnutChartLabels: Label[] = ['Utility Power', 'Solar Power'];
  doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}
}
