import { Component, OnInit, Input } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'view-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css'],
})
export class TxComponent implements OnInit {
  @Input()
  txHash?: string | null;
  @Input()
  transactions?: proto.main.Transaction[] | null;

  constructor() {}

  ngOnInit(): void {}
}
