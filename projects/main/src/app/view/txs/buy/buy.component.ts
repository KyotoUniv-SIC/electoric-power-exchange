import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AvailableBalance } from '@local/common';

interface Token {
  value: string;
  viewValue: string;
}

export type BuyOnSubmitEvent = {
  accountID: string;
  price: number;
  amount: number;
  denom: string;
};

@Component({
  selector: 'view-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  @Input()
  balance?: AvailableBalance | null;

  @Input()
  accountID?: string | null;

  @Input()
  price?: number | null;

  @Input()
  amount?: number | null;

  @Input()
  denom?: string | null;

  @Output()
  appSubmit: EventEmitter<BuyOnSubmitEvent>;

  constructor() {
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit(accountID: string, price: string, amount: string, denom: string) {
    if (!denom) {
      alert('トークンの種類を指定してください。\nUPX=電力会社、SPX=太陽光発電');
      return;
    }
    this.appSubmit.emit({ accountID, price: Number(price), amount: Number(amount), denom });
  }

  calcTotalPrice(price: any, amount: any) {
    if (!price || !amount) return null;
    return price * amount;
  }

  tokens: Token[] = [
    { value: 'upx-0', viewValue: 'upx' },
    { value: 'spx-1', viewValue: 'spx' },
  ];
}
