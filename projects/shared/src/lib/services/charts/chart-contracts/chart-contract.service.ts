import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { SinglePriceNormalSettlement, SinglePriceRenewableSettlement } from '@local/common';
import { ChartType } from 'chart.js';

export const contractChartType: ChartType = 'bar';
export const contractChartLegend = true;

@Injectable({
  providedIn: 'root',
})
export class ChartContractService {
  constructor() {}
  createContractChartDataSets(settlements: SinglePriceNormalSettlement[] | SinglePriceRenewableSettlement[]) {
    const prices = this.getPrices(settlements);
    const amounts = this.getAmounts(settlements);
    if (prices.length != amounts.length) {
      console.log('It must be same length ');
      return [];
    }
    const referencePrices = Array(prices.length).fill(27 as number);
    const dataSets = [
      {
        data: referencePrices,
        label: 'Reference Price',
        borderDash: [5, 3], //点線
        fill: 'false', //塗りつぶし
        type: 'line',
        tension: 0,
        yAxisID: 'y-axis-price',
      },
      {
        data: prices,
        label: 'Contract Price',
        fill: 'false',
        type: 'line',
        tension: 0,
        yAxisID: 'y-axis-price',
      },
      { data: amounts, label: 'Contract Amount', type: 'bar', yAxisID: 'y-axis-amount' },
    ];
    return dataSets;
  }

  createContractChartDatesLabel(settlements: SinglePriceNormalSettlement[] | SinglePriceRenewableSettlement[]) {
    const latest7Settlements = this.getLatest7Settlement(settlements);
    return latest7Settlements.map(
      (param) => (param.created_at as Timestamp).toDate().getMonth() + 1 + '/' + (param.created_at as Timestamp).toDate().getDate(),
    );
  }

  createContractChartOption(settlements: SinglePriceNormalSettlement[] | SinglePriceRenewableSettlement[]) {
    const settlement = settlements[0];
    const prices = this.getPrices(settlements);
    const amounts = this.getAmounts(settlements);
    const maxPrice = prices.reduce((a, b) => Math.max(a, b));
    const minPrice = prices.reduce((a, b) => Math.min(a, b));
    const maxAmount = amounts.reduce((a, b) => Math.max(a, b));
    const minAmount = amounts.reduce((a, b) => Math.min(a, b));
    const option = {
      responsive: false,
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
              max: maxPrice + 5,
              min: Math.max(minPrice - 5, 0),
              stepSize: 10,
            },
          },
          {
            id: 'y-axis-amount',
            scaleLabel: {
              display: true,
              labelString: settlement instanceof SinglePriceNormalSettlement ? 'UPX Amount' : 'SPX Amount',
            },
            type: 'linear',
            position: 'right',
            ticks: {
              max: maxAmount + 5,
              min: Math.max(minAmount - 5, 0),
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
    return option;
  }

  getPrices(settlements: SinglePriceNormalSettlement[] | SinglePriceRenewableSettlement[]) {
    const latest7Settlements = this.getLatest7Settlement(settlements);
    return latest7Settlements.map((param) => parseInt(param.price_ujpy) / 1000000);
  }

  getAmounts(settlements: SinglePriceNormalSettlement[] | SinglePriceRenewableSettlement[]) {
    const latest7Settlements = this.getLatest7Settlement(settlements);
    return latest7Settlements.map((param) => {
      if (param instanceof SinglePriceNormalSettlement) {
        return parseInt(param.amount_uupx) / 1000000;
      } else {
        return parseInt(param.amount_uspx) / 1000000;
      }
    });
  }

  getLatest7Settlement(settlements: SinglePriceNormalSettlement[] | SinglePriceRenewableSettlement[]) {
    return settlements
      .sort((first, second) => {
        if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
          return 1;
        } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
          return -1;
        } else {
          return 0;
        }
      })
      .slice(0, 7)
      .reverse();
  }
}
