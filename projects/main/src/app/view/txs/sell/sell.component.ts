import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AvailableBalance, StudentAccount } from '@local/common';

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
  studentAccount?: StudentAccount | null;

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
    if (!this.studentAccount?.id) {
      alert('ユーザーログイン情報を取得できません');
      return;
    }
    if (denom == 'upx-0' && Number(amount) > this.balance?.amount_upx!) {
      alert('UPXの残高が足りません。');
      return;
    }
    if (denom == 'spx-1' && Number(amount) > this.balance?.amount_spx!) {
      alert('UPXの残高が足りません。');
      return;
    }
    this.appSubmit.emit({ accountID: this.studentAccount?.id, price: Number(price), amount: Number(amount), denom });
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
