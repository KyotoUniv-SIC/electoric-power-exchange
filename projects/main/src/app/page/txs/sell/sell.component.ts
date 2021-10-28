import { BidApplicationService } from '../../../models/bids/bid.application.service';
import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  sellRequest: proto.main.BidRequest;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(private readonly bidApp: BidApplicationService) {
    this.sellRequest = new proto.main.BidRequest();
  }

  ngOnInit(): void {}
  async onSubmit($event: SellOnSubmitEvent) {
    await this.bidApp.create(
      new proto.main.BidRequest({
        denom: $event.denom,
        price: $event.price,
        amount: $event.amount,
      }),
    );
  }
}
