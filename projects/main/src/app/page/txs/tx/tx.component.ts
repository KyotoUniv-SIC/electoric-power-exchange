import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { proto } from '@local/common';
import * as Long from 'long';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css'],
})
export class TxComponent implements OnInit {
  txHash$: Observable<string>;
  transactions$: Observable<proto.main.Transaction[] | undefined>;

  constructor(private route: ActivatedRoute) {
    this.txHash$ = this.route.params.pipe(map((params) => params.tx_hash));
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
