import { AskApplicationService } from '../../../models/asks/ask.application.service';
import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  buyRequest: proto.main.AskRequest;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(private readonly askApp: AskApplicationService) {
    this.buyRequest = new proto.main.AskRequest();
  }

  ngOnInit(): void {}

  async onSubmit($event: BuyOnSubmitEvent) {
    await this.askApp.create(
      new proto.main.AskRequest({
        denom: $event.denom,
        price: $event.price,
        amount: $event.amount,
      }),
    );
  }
}
