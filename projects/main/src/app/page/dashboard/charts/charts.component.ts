import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAsk, NormalBid, RenewableAsk, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartContractService } from 'projects/shared/src/lib/services/charts/chart-contracts/chart-contract.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Ranking {
  id: string;
  rank: number;
  name: string;
  kwhAmount: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  normalChartDataSets$: Observable<ChartDataSets[]> | undefined;
  normalChartDates$: Observable<string[]> | undefined;
  normalChartOptions$: Observable<ChartOptions> | undefined;

  renewableChartDataSets$: Observable<ChartDataSets[]> | undefined;
  renewableChartDates$: Observable<string[]> | undefined;
  renewableChartOptions$: Observable<ChartOptions> | undefined;

  constructor(
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
    private readonly chartContractApp: ChartContractService,
  ) {
    const normalSettlements$ = this.singlePriceNormalApp.list$();
    const renewableSettlements$ = this.singlePriceRenewableApp.list$();

    this.normalChartDataSets$ = normalSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDataSets(settlements)),
    );

    this.normalChartDates$ = normalSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDatesLabel(settlements)),
    );

    this.normalChartOptions$ = normalSettlements$.pipe(map((settlements) => this.chartContractApp.createContractChartOption(settlements)));

    this.renewableChartDataSets$ = renewableSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDataSets(settlements)),
    );

    this.renewableChartDates$ = renewableSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartDatesLabel(settlements)),
    );

    this.renewableChartOptions$ = renewableSettlements$.pipe(
      map((settlements) => this.chartContractApp.createContractChartOption(settlements)),
    );
  }

  ngOnInit(): void {}
}
