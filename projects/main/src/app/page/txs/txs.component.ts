import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { proto } from '@local/common';
import * as Long from 'long';
import { combineLatest, Observable, of } from 'rxjs';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  transactions$: Observable<proto.main.Transaction[] | undefined>;

  constructor(private route: ActivatedRoute) {
    this.transactions$ = of([
      new proto.main.Transaction({
        status: true,
        id: 'dummy01',
        sender_account_id: 'Bob',
        sender_xrp_address: 'xrp01',
        recipient_account_id: 'Alice',
        recipient_xrp_address: 'xrp02',
        amount: Long.fromNumber(100),
        denom: 'epx',
      }),
      new proto.main.Transaction({
        status: false,
        id: 'dummy02',
        sender_account_id: 'Alice',
        sender_xrp_address: 'xrp02',
        recipient_account_id: 'Bob',
        recipient_xrp_address: 'xrp01',
        amount: Long.fromNumber(100),
        denom: 'spx',
      }),
    ]);
  }

  ngOnInit(): void {}
}
