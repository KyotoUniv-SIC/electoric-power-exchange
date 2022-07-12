import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { NormalBid, RenewableBid, SinglePriceNormalSettlement, SinglePriceRenewableSettlement, StudentAccount } from '@local/common';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { AvailableBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/available-balances/available-balance.application.service';
import { InsufficientBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/insufficient-balances/insufficient-balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  uupxAmount$: Observable<number> | undefined;
  uspxAmount$: Observable<number> | undefined;
  insufficiencyAmount$: Observable<number> | undefined;
  singlePriceNormal$: Observable<SinglePriceNormalSettlement> | undefined;
  singlePriceNormalDate$: Observable<Date> | undefined;
  singlePriceRenewable$: Observable<SinglePriceRenewableSettlement> | undefined;
  singlePriceRenewableDate$: Observable<Date> | undefined;
  normalGraphPrices$: Observable<Label[]>;
  normalGraphAmounts$: Observable<ChartDataSets[]>;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private auth: Auth,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly renewableBidApp: RenewableBidApplicationService,
    private readonly availableBalanceApp: AvailableBalanceApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
    private readonly normalBidHistoryApp: NormalBidHistoryApplicationService,
    private readonly normalAskHistoryApp: NormalAskHistoryApplicationService,
    private readonly renewableBidHistoryApp: RenewableBidHistoryApplicationService,
    private readonly renewableAskHistoryApp: RenewableAskHistoryApplicationService,
  ) {
    this.price = 27;
    this.amount = 1;
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const balance$ = this.studentAccount$.pipe(mergeMap((account) => this.availableBalanceApp.list$(account.id)));
    const insufficiency$ = this.studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(insufficiency.amount_utoken)) : count;
        }
        return count;
      }),
    );
    this.uupxAmount$ = combineLatest([balance$, insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        parseInt(balance.amount_uupx) < insufficiency ? 0 : parseInt(balance.amount_uupx) - insufficiency,
      ),
    );
    this.uspxAmount$ = combineLatest([balance$, insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        parseInt(balance.amount_uspx) + parseInt(balance.amount_uupx) < insufficiency
          ? 0
          : parseInt(balance.amount_uupx) < insufficiency
          ? parseInt(balance.amount_uspx) + parseInt(balance.amount_uupx) - insufficiency
          : parseInt(balance.amount_uspx),
      ),
    );
    this.insufficiencyAmount$ = combineLatest([balance$, insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        parseInt(balance.amount_uupx) + parseInt(balance.amount_uspx) < insufficiency
          ? insufficiency - parseInt(balance.amount_uupx) - parseInt(balance.amount_uspx)
          : 0,
      ),
    );
    this.singlePriceNormal$ = this.singlePriceNormalApp.getLatest$();
    this.singlePriceNormalDate$ = this.singlePriceNormal$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.singlePriceRenewable$ = this.singlePriceRenewableApp.getLatest$();
    this.singlePriceRenewableDate$ = this.singlePriceRenewable$.pipe(map((single) => (single.market_date as Timestamp).toDate()));

    // 昨日分のグラフ作成
    const historyNormalBids$ = this.normalBidHistoryApp.listYesterdayAll$();
    const historyNormalAsks$ = this.normalAskHistoryApp.listYesterdayAll$();
    const combines$ = combineLatest([historyNormalBids$, historyNormalAsks$]);
    const maxPrice$ = combines$.pipe(
      map(([bids, asks]) => {
        const maxBid = bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
        const maxAsk = asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.max(prev, current));
        return Math.max(maxBid, maxAsk);
      }),
    );
    const minPrice$ = combines$.pipe(
      map(([bids, asks]) => {
        const minBid = bids.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
        const minAsk = asks.map((param) => parseInt(param.price_ujpy)).reduce((prev, current) => Math.min(prev, current));
        return Math.min(minBid, minAsk);
      }),
    );

    // 横軸を最大値と最小値から作成
    this.normalGraphPrices$ = combineLatest([maxPrice$, minPrice$]).pipe(
      map(([max, min]) => {
        const minStr = (min / 1000000).toString();
        const maxStr = (max / 1000000).toString();
        const minCeil = Math.ceil(min / 100000);
        const minCeilStr = (minCeil / 10).toString();
        const maxFloor = Math.floor(max / 100000);
        const maxFloorStr = (maxFloor / 10).toString();
        if (minCeil == maxFloor) {
          if (min == max) {
            return [maxStr];
          } else if (min == minCeil || max == minCeil) {
            return [minStr, maxStr];
          } else {
            return [minStr, minCeilStr, maxStr];
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
          prices.push(maxFloorStr);

          return prices;
        }
      }),
    );

    // 横軸に合わせてBidの量を負の値の配列で作成
    const NormalGraphBids$ = combineLatest([this.normalGraphPrices$, historyNormalBids$]).pipe(
      map(([prices, bids]) =>
        prices.map((price) => {
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
        }),
      ),
    );

    // 横軸に合わせてAskの量を正の値の配列で作成
    const NormalGraphAsks$ = combineLatest([this.normalGraphPrices$, historyNormalAsks$]).pipe(
      map(([prices, asks]) =>
        prices.map((price) => {
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
        }),
      ),
    );

    this.normalGraphAmounts$ = combineLatest([NormalGraphBids$, NormalGraphAsks$]).pipe(
      map(([bids, asks]) => [
        { data: bids, label: 'UPX Bids' },
        { data: asks, label: 'UPX Asks' },
      ]),
    );
  }

  ngOnInit(): void {}

  async onSubmit($event: BuyOnSubmitEvent) {
    if ($event.denom == 'spx-1') {
      await this.renewableBidApp.create(
        new RenewableBid({
          account_id: $event.accountID,
          price_ujpy: $event.ujpyPrice,
          amount_uspx: $event.utokenAmount,
          is_deleted: false,
        }),
      );
    } else {
      await this.normalBidApp.create(
        new NormalBid({
          account_id: $event.accountID,
          price_ujpy: $event.ujpyPrice,
          amount_uupx: $event.utokenAmount,
          is_deleted: false,
        }),
      );
    }
  }
}
