import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

interface Token {
  value: string;
  viewValue: string;
}

export type SellOnSubmitEvent = {
  accountID: string;
  price: number;
  amount: number;
  denom: string;
};

@Component({
  selector: 'view-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  @Input()
  accountID?: string | null;

  @Input()
  price?: number | null;

  @Input()
  amount?: number | null;

  @Input()
  denom?: string | null;

  @Output()
  appSubmit: EventEmitter<SellOnSubmitEvent>;

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

  calcTotalPrice() {
    if (!this.price || !this.amount) return null;
    return this.price * this.amount;
  }
  calcElectricity() {
    if (!this.amount) return null;
    return this.amount;
  }

  tokens: Token[] = [
    { value: 'upx-0', viewValue: 'upx' },
    { value: 'spx-1', viewValue: 'spx' },
  ];
}
