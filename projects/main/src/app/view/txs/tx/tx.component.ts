import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css'],
})
export class TxComponent implements OnInit {
  @Input()
  tx?: Tx;
  
  constructor() {}

  ngOnInit(): void {}
}
