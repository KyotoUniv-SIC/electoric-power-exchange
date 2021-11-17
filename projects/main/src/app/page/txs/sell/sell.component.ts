import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { BidRequest } from '@local/common';
import { BidRequestApplicationService } from 'projects/shared/src/lib/services/bid-requests/bid-request.application.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(private readonly bidApp: BidRequestApplicationService) {}

  ngOnInit(): void {}
  async onSubmit($event: SellOnSubmitEvent) {
    await this.bidApp.create(
      new BidRequest({
        account_id: getAuth().currentUser?.uid,
        denom: $event.denom,
        price: $event.price,
        amount: $event.amount,
      }),
    );
  }
}
