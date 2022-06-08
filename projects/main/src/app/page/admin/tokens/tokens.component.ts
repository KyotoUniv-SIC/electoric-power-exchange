import { SetCostOnSubmitEvent, SetNormalOnSubmitEvent, SetRenewableOnSubmitEvent } from '../../../view/admin/tokens/tokens.component';
import { Component, OnInit } from '@angular/core';
import { CostSetting, NormalAskSetting, RenewableAskSetting } from '@local/common';
import { CostSettingApplicationService } from 'projects/shared/src/lib/services/cost-settings/cost-setting.application.service';
import { NormalAskSettingApplicationService } from 'projects/shared/src/lib/services/normal-ask-settings/normal-ask-setting.application.service';
import { RenewableAskSettingApplicationService } from 'projects/shared/src/lib/services/renewable-ask-settings/renewable-ask-setting.application.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css'],
})
export class TokensComponent implements OnInit {
  normalSetting$: Observable<NormalAskSetting> | undefined;
  renewableSetting$: Observable<RenewableAskSetting> | undefined;
  costSetting$: Observable<CostSetting> | undefined;

  constructor(
    private readonly normalAskSettingApp: NormalAskSettingApplicationService,
    private readonly renewableAskSettingApp: RenewableAskSettingApplicationService,
    private readonly costSettingApp: CostSettingApplicationService,
  ) {
    this.normalSetting$ = this.normalAskSettingApp.getLatest$();
    this.renewableSetting$ = this.renewableAskSettingApp.getLatest$();
    this.costSetting$ = this.costSettingApp.getLatest$();
  }

  ngOnInit(): void {}

  async onSubmitNormal($event: SetNormalOnSubmitEvent) {
    await this.normalAskSettingApp.create(
      new NormalAskSetting({
        price_ujpy: $event.ujpyPrice,
        ratio_percentage: $event.uupxRatio,
        enable: $event.enable,
      }),
    );
  }

  async onSubmitRenewable($event: SetRenewableOnSubmitEvent) {
    await this.renewableAskSettingApp.create(new RenewableAskSetting({ price_ujpy: $event.ujpyPrice, amount_uspx: $event.uspxAmount }));
  }

  async onSubmitCost($event: SetCostOnSubmitEvent) {
    await this.costSettingApp.create(
      new CostSetting({ system_cost_ujpy: $event.systemCost, electricity_cost_ujpy: $event.electricityCost }),
    );
  }
}
