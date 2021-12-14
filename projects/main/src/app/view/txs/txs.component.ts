import { Order, History } from '../../page/txs/txs.component';
import { Component, OnInit, Input } from '@angular/core';
import { NormalAskHistory, NormalBid, NormalBidHistory, proto, RenewableAskHistory, RenewableBidHistory } from '@local/common';

@Component({
  selector: 'view-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  @Input()
  orders?: Order[] | null;

  @Input()
  histories?: History[] | null;

  constructor() {}

  ngOnInit(): void {}

  powerType(type: boolean) {
    if (!type) {
      return 'utility';
    } else {
      return 'solar';
    }
  }
  txType(type: boolean) {
    if (!type) {
      return 'ask';
    } else {
      return 'bid';
    }
  }
}
