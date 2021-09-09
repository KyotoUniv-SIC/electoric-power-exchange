import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { proto } from '@local/common'
import { combineLatest, Observable, of } from 'rxjs';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  transactions$: Observable<any[] | undefined>;

  constructor(private route: ActivatedRoute) {
    const transactions01$ = of(
      {
        status: true,
        id: "dummy01",
        sender_account_id: "Bob",
        sender_xrp_address: "xrp01",
        recipient_account_id: "Alice",
        recipient_xrp_address: "xrp02",
        amount: 100,
        denom: "epx"
      }
    );
    const transactions02$ = of(
      {
        status: false,
        id: "dummy02",
        sender_account_id: "Alice",
        sender_xrp_address: "xrp02",
        recipient_account_id: "Bob",
        recipient_xrp_address: "xrp01",
        amount: 100,
        denom: "spx"
      }
    );
    this.transactions$ = combineLatest([transactions01$, transactions02$])
   }

  ngOnInit(): void {
  }

}
