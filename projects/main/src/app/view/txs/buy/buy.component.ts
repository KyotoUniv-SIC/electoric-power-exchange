import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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
