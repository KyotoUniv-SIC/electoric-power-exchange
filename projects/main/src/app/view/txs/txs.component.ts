import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  @Input()
  transactions?: any | null;

  constructor() {}

  ngOnInit(): void {}
}
