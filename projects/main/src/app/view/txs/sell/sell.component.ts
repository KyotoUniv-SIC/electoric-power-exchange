import { Component, OnInit, Input } from '@angular/core';

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
}
