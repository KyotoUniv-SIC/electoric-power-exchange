import { Component, OnInit, Input } from '@angular/core';

interface Token {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'view-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  price = 22;
  amount = 1;
  calcTotalPrice() {
    if (!this.price || !this.amount) return null;
    return this.price * this.amount;
  }
  calcElectricity() {
    if (!this.amount) return null;
    return this.amount;
  }

  tokens: Token[] = [
    {value: 'upx-0', viewValue: 'upx'},
    {value: 'spx-1', viewValue: 'spx'},
    {value: 'epx-2', viewValue: 'epx'}
  ];
}
