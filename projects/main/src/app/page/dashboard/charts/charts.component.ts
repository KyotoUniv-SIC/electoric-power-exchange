import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAsk, NormalBid, RenewableAsk, SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartDataSets, ChartOptions } from 'chart.js';
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
  normalSettlement$: Observable<SinglePriceNormalSettlement> | undefined;
  normalDate$: Observable<Date> | undefined;
  normalSettlements$: Observable<SinglePriceNormalSettlement[]> | undefined;
  normalChartDataSets$: Observable<ChartDataSets[]> | undefined;
  normalChartDates$: Observable<string[]> | undefined;
  normalChartOptions$: Observable<ChartOptions> | undefined;

  renewableSettlement$: Observable<SinglePriceRenewableSettlement> | undefined;
  renewableDate$: Observable<Date> | undefined;
  renewableSettlements$: Observable<SinglePriceRenewableSettlement[]> | undefined;
  renewableChartDataSets$: Observable<ChartDataSets[]> | undefined;
  renewableChartDates$: Observable<string[]> | undefined;
  renewableChartOptions$: Observable<ChartOptions> | undefined;

  normalOperationBids$: Observable<NormalBid[]> | undefined;
  normalOperationAsks$: Observable<NormalAsk[]> | undefined;
  renewableOperationAsks$: Observable<RenewableAsk[]> | undefined;

  constructor(
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
  ) {
    this.normalSettlement$ = this.singlePriceNormalApp.getLatest$();
    this.normalDate$ = this.normalSettlement$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.renewableSettlement$ = this.singlePriceRenewableApp.getLatest$();
    this.renewableDate$ = this.renewableSettlement$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.normalSettlements$ = this.singlePriceNormalApp.listLatestMonth$();
    this.renewableSettlements$ = this.singlePriceRenewableApp.listLatestMonth$();

    const pricesNormal$ = this.normalSettlements$.pipe(map((params) => params.map((param) => parseInt(param.price_ujpy) / 1000000)));
    const amountsNormal$ = this.normalSettlements$.pipe(map((params) => params.map((param) => parseInt(param.amount_uupx) / 1000000)));
    const pricesRenewable$ = this.renewableSettlements$.pipe(map((params) => params.map((param) => parseInt(param.price_ujpy) / 1000000)));
    const amountsRenewable$ = this.renewableSettlements$.pipe(
      map((params) => params.map((param) => parseInt(param.amount_uspx) / 1000000)),
    );
    const referencePriceNormal$ = pricesNormal$.pipe(map((params) => Array(params.length).fill(27 as number)));
    const referencePriceRenewable$ = pricesRenewable$.pipe(map((params) => Array(params.length).fill(27 as number)));

    this.normalChartDataSets$ = combineLatest([pricesNormal$, amountsNormal$, referencePriceNormal$]).pipe(
      map(([prices, amounts, references]) => [
        { data: prices, label: 'Contract Price', fill: 'false', type: 'line', yAxisID: 'y-axis-price' },
        { data: amounts, label: 'Contract Amount', type: 'bar', yAxisID: 'y-axis-amount' },
        {
          data: references,
          label: 'Reference Price',
          borderDash: [5, 3], //点線
          fill: 'false', //塗りつぶし
          type: 'line',
          yAxisID: 'y-axis-price',
        },
      ]),
    );

    this.normalChartDates$ = this.normalSettlements$.pipe(
      map((params) =>
        params.map(
          (param) => (param.created_at as Timestamp).toDate().getMonth() + 1 + '/' + (param.created_at as Timestamp).toDate().getDate(),
        ),
      ),
    );

    this.renewableChartDataSets$ = combineLatest([pricesRenewable$, amountsRenewable$, referencePriceRenewable$]).pipe(
      map(([prices, amounts, references]) => [
        { data: prices, label: 'Contract Price', fill: '', type: 'line', yAxisID: 'y-axis-price' },
        { data: amounts, label: 'Contract Amount', yAxisID: 'y-axis-amount' },
        {
          data: references,
          label: 'Reference Price',
          borderDash: [5, 3],
          fill: 'false',
          type: 'line',
          yAxisID: 'y-axis-price',
        },
      ]),
    );

    this.renewableChartDates$ = this.renewableSettlements$.pipe(
      map((params) =>
        params.map(
          (param) => (param.created_at as Timestamp).toDate().getMonth() + 1 + '/' + (param.created_at as Timestamp).toDate().getDate(),
        ),
      ),
    );

    this.renewableChartDataSets$.subscribe((a) => console.log(a));

    const maxPriceNormal$ = pricesNormal$.pipe(map((pricesNormal) => pricesNormal.reduce((a, b) => Math.max(a, b))));
    const minPriceNormal$ = pricesNormal$.pipe(map((pricesNormal) => pricesNormal.reduce((a, b) => Math.min(a, b))));
    const maxAmountNormal$ = amountsNormal$.pipe(map((amountsNormal) => amountsNormal.reduce((a, b) => Math.max(a, b))));
    const minAmountNormal$ = amountsNormal$.pipe(map((amountsNormal) => amountsNormal.reduce((a, b) => Math.min(a, b))));

    const maxPriceRenewable$ = pricesRenewable$.pipe(map((pricesRenewable) => pricesRenewable.reduce((a, b) => Math.max(a, b))));
    const minPriceRenewable$ = pricesRenewable$.pipe(map((pricesRenewable) => pricesRenewable.reduce((a, b) => Math.min(a, b))));
    const maxAmountRenewable$ = amountsRenewable$.pipe(map((amountsRenewable) => amountsRenewable.reduce((a, b) => Math.max(a, b))));
    const minAmountRenewable$ = amountsRenewable$.pipe(map((amountsRenewable) => amountsRenewable.reduce((a, b) => Math.min(a, b))));

    this.normalChartOptions$ = combineLatest([maxPriceNormal$, minPriceNormal$, maxAmountNormal$, minAmountNormal$]).pipe(
      map(([maxPriceNormal, minPriceNormal, maxAmountNormal, minAmountNormal]) => {
        return {
          responsive: true,
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [
              {
                id: 'y-axis-price', // Y軸のID
                scaleLabel: {
                  display: true, // 必須
                  labelString: 'JPY', // 軸ラベル
                },
                type: 'linear', // linear固定
                position: 'left', // どちら側に表示される軸か？
                ticks: {
                  // スケール
                  max: maxPriceNormal + 5,
                  min: Math.max(minPriceNormal - 5, 0),
                  stepSize: 10,
                },
              },
              {
                id: 'y-axis-amount',
                scaleLabel: {
                  display: true,
                  labelString: 'UPX Amount',
                },
                type: 'linear',
                position: 'right',
                ticks: {
                  max: maxAmountNormal + 5,
                  min: Math.max(minAmountNormal - 5, 0),
                  stepSize: 10,
                },
                gridLines: {
                  // 2つ目の軸のグリッド削除
                  drawOnChartArea: false,
                },
              },
            ],
          },
        };
      }),
    );

    this.renewableChartOptions$ = combineLatest([maxPriceRenewable$, minPriceRenewable$, maxAmountRenewable$, minAmountRenewable$]).pipe(
      map(([maxPriceRenewable, minPriceRenewable, maxAmountRenewable, minAmountRenewable]) => {
        return {
          responsive: true,
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [
              {
                id: 'y-axis-price', // Y軸のID
                scaleLabel: {
                  display: true, // 必須
                  labelString: 'JPY', // 軸ラベル
                },
                type: 'linear', // linear固定
                position: 'left', // どちら側に表示される軸か？
                ticks: {
                  // スケール
                  max: maxPriceRenewable + 5,
                  min: Math.max(minPriceRenewable - 5, 0),
                  stepSize: 10,
                },
              },
              {
                id: 'y-axis-amount',
                scaleLabel: {
                  display: true,
                  labelString: 'SPX Amount',
                },
                type: 'linear',
                position: 'right',
                ticks: {
                  max: maxAmountRenewable + 5,
                  min: Math.max(minAmountRenewable - 5, 0),
                  stepSize: 10,
                },
                gridLines: {
                  // 2つ目の軸のグリッド削除
                  drawOnChartArea: false,
                },
              },
            ],
          },
        };
      }),
    );
  }

  ngOnInit(): void {}
}
