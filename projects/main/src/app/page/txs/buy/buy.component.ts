import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { NormalBid, RenewableBid, SinglePriceNormalSettlement, SinglePriceRenewableSettlement, StudentAccount } from '@local/common';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartOrderService } from 'projects/shared/src/lib/services/charts/chart-orders/chart-order.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
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
  renewableGraphPrices$: Observable<Label[]>;
  renewableGraphAmounts$: Observable<ChartDataSets[]>;
  isNormalContractToday$: Observable<boolean>;
  isRenewableContractToday$: Observable<boolean>;
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
    private readonly ordersChartApp: ChartOrderService,
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
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.isNormalContractToday$ = this.singlePriceNormal$.pipe(map((price) => (price.created_at as Timestamp).toDate() > yesterday));
    this.isRenewableContractToday$ = this.singlePriceRenewable$.pipe(map((price) => (price.created_at as Timestamp).toDate() > yesterday));

    // 昨日分のグラフ作成
    this.normalGraphPrices$ = this.ordersChartApp.createNormalPriceLabels();
    this.renewableGraphPrices$ = this.ordersChartApp.createRenewablePriceLabels();

    this.normalGraphAmounts$ = this.ordersChartApp.createNormalAmountDataSets();
    this.renewableGraphAmounts$ = this.ordersChartApp.createRenewableAmountDataSets();
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
