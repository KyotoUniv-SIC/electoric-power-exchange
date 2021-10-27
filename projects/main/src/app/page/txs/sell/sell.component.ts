import { BidApplicationService } from '../../../models/bids/bid.application.service';
import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { BidRequest } from 'common/src/entities/bids';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  SellRequest: BidRequest;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(private readonly bidApp: BidApplicationService) {
    this.SellRequest = new BidRequest();
  }

  ngOnInit(): void {}
  async onSubmit($event: SellOnSubmitEvent) {
    await this.bidApp.create(
      new BidRequest({
        denom: $event.denom,
        price: $event.price,
        amount: $event.amount,
      }),
    );
  }
}
