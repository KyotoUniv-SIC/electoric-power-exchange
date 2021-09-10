import { Component, OnInit, Input } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'view-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  @Input()
  transactions?: proto.main.Transaction[] | null;

  constructor() {}

  ngOnInit(): void {}
}
