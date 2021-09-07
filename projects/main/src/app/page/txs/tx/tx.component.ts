import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css'],
})
export class TxComponent implements OnInit {
  txID$: Observable<string>;
  tx$: Observable<Tx>;

  constructor(private tx: TxService) {
    this.txID$ = this.route.params.pipe(
      map(params => params['tx_id']),
    );
    this.tx$ = this.txID$.pipe(
      mergeMap(id => this.tx.get$(id)),
    );
  }

  ngOnInit(): void {}
}
