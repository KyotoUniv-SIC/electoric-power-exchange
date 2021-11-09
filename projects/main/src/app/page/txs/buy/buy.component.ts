import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { AskRequest } from '@local/common';
import { AskRequestApplicationService } from 'projects/shared/src/lib/services/ask-requests/ask-request.application.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(private readonly askApp: AskRequestApplicationService) {}

  ngOnInit(): void {}

  async onSubmit($event: BuyOnSubmitEvent) {
    await this.askApp.create(
      new AskRequest({
        denom: $event.denom,
        price: $event.price,
        amount: $event.amount,
      }),
    );
  }
}
