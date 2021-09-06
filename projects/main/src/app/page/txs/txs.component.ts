import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  data$: Observable<Txs[]>;

  constructor(private txs: TxsService) {
    this.data$ = this.txs.list$();
  }

  ngOnInit(): void {}
}
