import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AvailableBalance, NormalAsk, RenewableAsk } from '@local/common';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-ask/normal-ask.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-ask/renewable-ask.application.service';
import { AvailableBalanceApplicationService } from 'projects/shared/src/lib/student-accounts/available-balances/available-balance.application.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  balance$: Observable<AvailableBalance> | undefined;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly availableBalanceApp: AvailableBalanceApplicationService,
  ) {
    this.price = 27;
    this.amount = 1;
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    this.balance$ = this.availableBalanceApp.list$(accountID);
  }

  ngOnInit(): void {}
  async onSubmit($event: SellOnSubmitEvent) {
    if ($event.denom == 'spx-1') {
      await this.renewableAskApp.create(
        new RenewableAsk({
          account_id: getAuth().currentUser?.uid,
          price: $event.price,
          amount: $event.amount,
        }),
      );
    } else {
      await this.normalAskApp.create(
        new NormalAsk({
          account_id: getAuth().currentUser?.uid,
          price: $event.price,
          amount: $event.amount,
        }),
      );
    }
  }
}
