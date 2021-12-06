import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { NormalAsk, RenewableAsk } from '@local/common';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-ask/normal-ask.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-ask/renewable-ask.application.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
  ) {
    this.price = 27;
    this.amount = 1;
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
