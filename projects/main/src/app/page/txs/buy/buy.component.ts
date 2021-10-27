import { AskApplicationService } from '../../../models/asks/ask.application.service';
import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { AskRequest } from 'common/src/entities/asks';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  buyRequest: AskRequest;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(private readonly askApp: AskApplicationService) {
    this.buyRequest = new AskRequest();
  }

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
