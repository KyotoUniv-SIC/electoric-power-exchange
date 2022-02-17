import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NormalAskSetting, RenewableAskSetting } from '@local/common';

export type SetNormalOnSubmitEvent = {
  price: number;
  amount: number;
};

export type SetRenewableOnSubmitEvent = {
  price: number;
  amount: number;
};

@Component({
  selector: 'view-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css'],
})
export class TokensComponent implements OnInit {
  @Input()
  normalSetting?: NormalAskSetting | null;
  @Input()
  renewableSetting?: RenewableAskSetting | null;
  @Output()
  appSubmitNormal: EventEmitter<SetNormalOnSubmitEvent>;
  @Output()
  appSubmitRenewable: EventEmitter<SetRenewableOnSubmitEvent>;

  constructor() {
    this.appSubmitNormal = new EventEmitter();
    this.appSubmitRenewable = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmitNormal(price: string, amount: string) {
    if (!price) {
      alert('価格を設定してください');
      return;
    }
    this.appSubmitNormal.emit({ price: Number(price), amount: Number(amount) });
  }

  onSubmitRenewable(price: string, amount: string) {
    if (!price) {
      alert('価格を設定してください');
      return;
    }
    if (!amount) {
      alert('発行量を設定してください');
      return;
    }
    this.appSubmitRenewable.emit({ price: Number(price), amount: Number(amount) });
  }
}
