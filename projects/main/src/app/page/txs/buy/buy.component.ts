import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { AvailableBalance, NormalBid, RenewableBid } from '@local/common';
import { getAuth } from 'firebase/auth';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bid/renewable-bid.application.service';
import { AvailableBalanceApplicationService } from 'projects/shared/src/lib/student-accounts/available-balances/available-balance.application.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  balance$: Observable<AvailableBalance> | undefined;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly renewableBidApp: RenewableBidApplicationService,
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

  async onSubmit($event: BuyOnSubmitEvent) {
    if ($event.denom == 'spx-1') {
      await this.renewableBidApp.create(
        new RenewableBid({
          account_id: getAuth().currentUser?.uid,
          price: $event.price,
          amount: $event.amount,
        }),
      );
    } else {
      await this.normalBidApp.create(
        new NormalBid({
          account_id: getAuth().currentUser?.uid,
          price: $event.price,
          amount: $event.amount,
        }),
      );
    }
  }
}
