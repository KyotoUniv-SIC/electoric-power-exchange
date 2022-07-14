import { NormalAskHistoryApplicationService } from '../../normal-ask-histories/normal-ask-history.application.service';
import { NormalBidHistoryApplicationService } from '../../normal-bid-histories/normal-bid-history.application.service';
import { RenewableAskHistoryApplicationService } from '../../renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableBidHistoryApplicationService } from '../../renewable-bid-histories/renewable-bid-history.application.service';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersChartService {
  constructor(
    private readonly normalBidHistoryApp: NormalBidHistoryApplicationService,
    private readonly normalAskHistoryApp: NormalAskHistoryApplicationService,
    private readonly renewableBidHistoryApp: RenewableBidHistoryApplicationService,
    private readonly renewableAskHistoryApp: RenewableAskHistoryApplicationService,
  ) {}
  // 横軸を最大値と最小値から作成
  createNormalPriceLabels() {
    const historyNormalBids$ = this.normalBidHistoryApp.listYesterdayAll$();
    const historyNormalAsks$ = this.normalAskHistoryApp.listYesterdayAll$();
    const combinesNormal$ = combineLatest([historyNormalBids$, historyNormalAsks$]);
    const maxNormalPrice$ = combinesNormal$.pipe(
      map(([bids, asks]) => {
        if (!bids.length || !asks.length) {
          return 0;
        } else if (!bids.length) {
          return asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
        } else if (!asks.length) {
          return bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
        } else {
          const maxBid = bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
          const maxAsk = asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
          return Math.max(maxBid, maxAsk);
        }
      }),
    );
    const minNormalPrice$ = combinesNormal$.pipe(
      map(([bids, asks]) => {
        if (!bids.length || !asks.length) {
          return 0;
        } else if (!bids.length) {
          return asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
        } else if (!asks.length) {
          return bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
        } else {
          const minBid = bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
          const minAsk = asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
          return Math.min(minBid, minAsk);
        }
      }),
    );
    return combineLatest([maxNormalPrice$, minNormalPrice$]).pipe(map(([max, min]) => this.createHorizontalAxis(min, max)));
  }

  createRenewablePriceLabels() {
    const historyRenewableBids$ = this.renewableBidHistoryApp.listYesterdayAll$();
    const historyRenewableAsks$ = this.renewableAskHistoryApp.listYesterdayAll$();
    const combinesRenewable$ = combineLatest([historyRenewableBids$, historyRenewableAsks$]);
    const maxRenewablePrice$ = combinesRenewable$.pipe(
      map(([bids, asks]) => {
        if (!bids.length || !asks.length) {
          return 0;
        } else if (!bids.length) {
          return asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
        } else if (!asks.length) {
          return bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
        } else {
          const maxBid = bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
          const maxAsk = asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
          return Math.max(maxBid, maxAsk);
        }
      }),
    );
    const minRenewablePrice$ = combinesRenewable$.pipe(
      map(([bids, asks]) => {
        if (!bids.length || !asks.length) {
          return 0;
        } else if (!bids.length) {
          return asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
        } else if (!asks.length) {
          return bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
        } else {
          const minBid = bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
          const minAsk = asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
          return Math.min(minBid, minAsk);
        }
      }),
    );
    return combineLatest([maxRenewablePrice$, minRenewablePrice$]).pipe(map(([max, min]) => this.createHorizontalAxis(min, max)));
  }

  // 量の配列を作成
  createNormalAmountDataSets() {
    const historyNormalBids$ = this.normalBidHistoryApp.listYesterdayAll$();
    const historyNormalAsks$ = this.normalAskHistoryApp.listYesterdayAll$();
    const labels$ = this.createNormalPriceLabels();
    // 横軸に合わせてBidの量を負の値の配列で作成
    const normalGraphBids$ = combineLatest([labels$, historyNormalBids$]).pipe(
      map(([prices, bids]) =>
        prices
          .map((price) => {
            const ujpyPrice = Number(price) * 1000000;
            if (Number.isInteger(ujpyPrice / 100000)) {
              return bids.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice >= ujpyPrice && currentPrice < ujpyPrice + 100000) {
                  return sum - parseInt(current.amount_uupx);
                } else {
                  return sum;
                }
              }, 0);
            } else {
              return bids.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice == ujpyPrice) {
                  return sum - parseInt(current.amount_uupx);
                } else {
                  return sum;
                }
              }, 0);
            }
          })
          .map((amount) => amount / 1000000),
      ),
    );

    // 横軸に合わせてAskの量を正の値の配列で作成
    const normalGraphAsks$ = combineLatest([labels$, historyNormalAsks$]).pipe(
      map(([prices, asks]) =>
        prices
          .map((price) => {
            const ujpyPrice = Number(price) * 1000000;
            if (Number.isInteger(ujpyPrice / 100000)) {
              return asks.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice >= ujpyPrice && currentPrice < ujpyPrice + 100000) {
                  return sum + parseInt(current.amount_uupx);
                } else {
                  return sum;
                }
              }, 0);
            } else {
              return asks.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice == ujpyPrice) {
                  return sum + parseInt(current.amount_uupx);
                } else {
                  return sum;
                }
              }, 0);
            }
          })
          .map((price) => price / 1000000),
      ),
    );

    return combineLatest([normalGraphBids$, normalGraphAsks$]).pipe(
      map(([bids, asks]) => [
        { data: bids, label: 'UPX Bids' },
        { data: asks, label: 'UPX Asks' },
      ]),
    );
  }

  createRenewableAmountDataSets() {
    const historyRenewableBids$ = this.renewableBidHistoryApp.listYesterdayAll$();
    const historyRenewableAsks$ = this.renewableAskHistoryApp.listYesterdayAll$();
    const labels$ = this.createRenewablePriceLabels();
    const renewableGraphBids$ = combineLatest([labels$, historyRenewableBids$]).pipe(
      map(([prices, bids]) =>
        prices
          .map((price) => {
            const ujpyPrice = Number(price) * 1000000;
            if (Number.isInteger(ujpyPrice / 100000)) {
              return bids.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice >= ujpyPrice && currentPrice < ujpyPrice + 100000) {
                  return sum - parseInt(current.amount_uspx);
                } else {
                  return sum;
                }
              }, 0);
            } else {
              return bids.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice == ujpyPrice) {
                  return sum - parseInt(current.amount_uspx);
                } else {
                  return sum;
                }
              }, 0);
            }
          })
          .map((amount) => amount / 1000000),
      ),
    );
    const renewableGraphAsks$ = combineLatest([labels$, historyRenewableAsks$]).pipe(
      map(([prices, asks]) =>
        prices
          .map((price) => {
            const ujpyPrice = Number(price) * 1000000;
            if (Number.isInteger(ujpyPrice / 100000)) {
              return asks.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice >= ujpyPrice && currentPrice < ujpyPrice + 100000) {
                  return sum + parseInt(current.amount_uspx);
                } else {
                  return sum;
                }
              }, 0);
            } else {
              return asks.reduce((sum, current) => {
                const currentPrice = parseInt(current.price_ujpy);
                if (currentPrice == ujpyPrice) {
                  return sum + parseInt(current.amount_uspx);
                } else {
                  return sum;
                }
              }, 0);
            }
          })
          .map((price) => price / 1000000),
      ),
    );
    return combineLatest([renewableGraphBids$, renewableGraphAsks$]).pipe(
      map(([bids, asks]) => [
        { data: bids, label: 'SPX Bids' },
        { data: asks, label: 'SPX Asks' },
      ]),
    );
  }

  createHorizontalAxis(min: number, max: number) {
    const minStr = (min / 1000000).toString();
    const maxStr = (max / 1000000).toString();
    const minCeil = Math.ceil(min / 100000);
    const minCeilStr = (minCeil / 10).toString();
    const maxFloor = Math.floor(max / 100000);
    const maxFloorStr = (maxFloor / 10).toString();
    if (minCeil == maxFloor) {
      if (min == max) {
        return [minStr];
      } else {
        return [minStr, maxStr];
      }
    } else {
      let prices = [minStr];
      if (minStr != minCeilStr) {
        prices.push(minCeilStr);
      }
      let price = minCeil;
      while (price < maxFloor) {
        price++;
        prices.push((price / 10).toString());
      }
      if (price != maxFloor) {
        prices.push(maxFloorStr);
      }

      return prices;
    }
  }
}
