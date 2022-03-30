import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import {
  AvailableBalance,
  NormalAsk,
  proto,
  RenewableAsk,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
  StudentAccount,
} from '@local/common';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { AvailableBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/available-balances/available-balance.application.service';
import { InsufficientBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/insufficient-balances/insufficient-balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  balance$: Observable<AvailableBalance> | undefined;
  insufficiency$: Observable<number> | undefined;
  singlePriceNormal$: Observable<SinglePriceNormalSettlement> | undefined;
  singlePriceNormalDate$: Observable<Date> | undefined;
  singlePriceRenewable$: Observable<SinglePriceRenewableSettlement> | undefined;
  singlePriceRenewableDate$: Observable<Date> | undefined;
  amountUPX$: Observable<number> | undefined;
  amountSPX$: Observable<number> | undefined;
  amountInsufficiency$: Observable<number> | undefined;

  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private auth: Auth,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly availableBalanceApp: AvailableBalanceApplicationService,
    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
  ) {
    this.price = 27;
    this.amount = 1;
    let firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setHours(0, 0, 0, 0);
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.balance$ = this.studentAccount$.pipe(mergeMap((account) => this.availableBalanceApp.list$(account.id)));
    this.insufficiency$ = this.studentAccount$.pipe(mergeMap((account) => this.insufficientBalanceApp.list(account.id))).pipe(
      map((insufficiencies) => {
        let count = 0;
        for (let insufficiency of insufficiencies) {
          (insufficiency.created_at as Timestamp).toDate() > firstDay ? (count += insufficiency.amount) : count;
        }
        return count;
      }),
    );
    this.amountUPX$ = combineLatest([this.balance$, this.insufficiency$]).pipe(
      map(([balance, insufficiency]) => (balance.amount_upx < insufficiency ? 0 : balance.amount_upx - insufficiency)),
    );
    this.amountSPX$ = combineLatest([this.balance$, this.insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        balance.amount_spx + balance.amount_upx < insufficiency
          ? 0
          : balance.amount_upx < insufficiency
          ? balance.amount_spx + balance.amount_upx - insufficiency
          : balance.amount_spx,
      ),
    );
    this.amountInsufficiency$ = combineLatest([this.balance$, this.insufficiency$]).pipe(
      map(([balance, insufficiency]) =>
        balance.amount_upx + balance.amount_spx < insufficiency ? insufficiency - balance.amount_upx - balance.amount_spx : 0,
      ),
    );
    this.singlePriceNormal$ = this.singlePriceNormalApp.getLatest$();
    this.singlePriceNormalDate$ = this.singlePriceNormal$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.singlePriceRenewable$ = this.singlePriceRenewableApp.getLatest$();
    this.singlePriceRenewableDate$ = this.singlePriceRenewable$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
  }

  ngOnInit(): void {}
  async onSubmit($event: SellOnSubmitEvent) {
    if ($event.denom == 'spx-1') {
      await this.renewableAskApp.create(
        new RenewableAsk({
          type: proto.main.RenewableAskType.SECONDARY,
          account_id: $event.accountID,
          price: $event.price,
          amount: $event.amount,
          is_deleted: false,
        }),
      );
    } else {
      await this.normalAskApp.create(
        new NormalAsk({
          type: proto.main.NormalAskType.SECONDARY,
          account_id: $event.accountID,
          price: $event.price,
          amount: $event.amount,
          is_deleted: false,
        }),
      );
    }
  }
}
