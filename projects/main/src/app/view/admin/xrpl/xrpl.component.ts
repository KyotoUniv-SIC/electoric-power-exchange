import { Component, Input, OnInit } from '@angular/core';
import { AdminAccount } from '@local/common';

@Component({
  selector: 'view-xrpl',
  templateUrl: './xrpl.component.html',
  styleUrls: ['./xrpl.component.css'],
})
export class XrplComponent implements OnInit {
  @Input()
  adminAccount?: AdminAccount | null;
  @Input()
  xrpLedgerHot?: any | null;
  @Input()
  xrpLedgerCold?: any | null;
  @Input()
  trustLineHot?: any | null;
  @Input()
  trustLineCold?: any | null;

  constructor() {}

  ngOnInit(): void {}

  calcMicroAmount(amount: any) {
    return Number(amount) * 10 ** -6;
  }
}
