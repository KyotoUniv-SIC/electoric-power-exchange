import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CostSetting, NormalAskSetting, RenewableAskSetting } from '@local/common';

export type SetNormalOnSubmitEvent = {
  price: number;
  amount: number;
};

export type SetRenewableOnSubmitEvent = {
  price: number;
  amount: number;
};

export type SetCostOnSubmitEvent = {
  system: number;
  electricity: number;
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
  @Input()
  costSetting?: CostSetting | null;
  @Output()
  appSubmitNormal: EventEmitter<SetNormalOnSubmitEvent>;
  @Output()
  appSubmitRenewable: EventEmitter<SetRenewableOnSubmitEvent>;
  @Output()
  appSubmitCost: EventEmitter<SetCostOnSubmitEvent>;

  constructor() {
    this.appSubmitNormal = new EventEmitter();
    this.appSubmitRenewable = new EventEmitter();
    this.appSubmitCost = new EventEmitter();
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

  onSubmitCost(system: string, electrisity: string) {
    if (!system) {
      alert('システムのコストを入力してください');
      return;
    }
    if (!electrisity) {
      alert('電気料金を入力してください');
      return;
    }
    this.appSubmitCost.emit({ system: Number(system), electricity: Number(electrisity) });
  }
}
