import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CostSetting, NormalAskSetting, RenewableAskSetting, RenewableRewardSetting } from '@local/common';

export type SetNormalOnSubmitEvent = {
  ujpyPrice: string;
  uupxRatio: string;
  enable: boolean;
};

export type SetRenewableOnSubmitEvent = {
  ujpyPrice: string;
  uspxAmount: string;
};

export type SetCostOnSubmitEvent = {
  systemCost: string;
  electricityCost: string;
};

export type SetRewardOnSubmitEvent = {
  firstReward: string;
  secondReward: string;
  thirdReward: string;
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
  @Input()
  renewableRewardSetting?: RenewableRewardSetting | null;
  @Output()
  appSubmitNormal: EventEmitter<SetNormalOnSubmitEvent>;
  @Output()
  appSubmitRenewable: EventEmitter<SetRenewableOnSubmitEvent>;
  @Output()
  appSubmitCost: EventEmitter<SetCostOnSubmitEvent>;
  @Output()
  appSubmitReward: EventEmitter<SetRewardOnSubmitEvent>;

  checked: boolean = false;

  constructor() {
    this.appSubmitNormal = new EventEmitter();
    this.appSubmitRenewable = new EventEmitter();
    this.appSubmitCost = new EventEmitter();
    this.appSubmitReward = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmitNormal(price: string, ratio: string) {
    if (!price) {
      alert('価格を設定してください');
      return;
    }
    const ujpyPrice = Math.floor(Number(price) * 1000000).toString();
    const uupxRatio = Math.floor(Number(ratio)).toString();
    this.appSubmitNormal.emit({ ujpyPrice, uupxRatio, enable: this.checked });
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
    const ujpyPrice = Math.floor(Number(price) * 1000000).toString();
    const uspxAmount = Math.floor(Number(amount) * 1000000).toString();
    this.appSubmitRenewable.emit({ ujpyPrice, uspxAmount });
  }

  onSubmitCost(system: string, electricity: string) {
    if (!system) {
      alert('システムのコストを入力してください');
      return;
    }
    if (!electricity) {
      alert('電気料金を入力してください');
      return;
    }
    const systemCost = Math.floor(Number(system) * 1000000).toString();
    const electricityCost = (Number(electricity) * 1000000).toString();
    this.appSubmitCost.emit({ systemCost, electricityCost });
  }

  onSubmitReward(first: string, second: string, third: string) {
    if (!first || !second || !third) {
      alert('システムのコストを入力してください');
      return;
    }
    const firstReward = Math.floor(Number(first) * 1000000).toString();
    const secondReward = Math.floor(Number(second) * 1000000).toString();
    const thirdReward = Math.floor(Number(third) * 1000000).toString();
    this.appSubmitReward.emit({ firstReward, secondReward, thirdReward });
  }
}
