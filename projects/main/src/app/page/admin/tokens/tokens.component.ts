import { SetNormalOnSubmitEvent, SetRenewableOnSubmitEvent } from '../../../view/admin/tokens/tokens.component';
import { Component, OnInit } from '@angular/core';
import { NormalAskSetting, RenewableAskSetting } from '@local/common';
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

  constructor(
    private readonly normalAskSettingApp: NormalAskSettingApplicationService,
    private readonly renewableAskSettingApp: RenewableAskSettingApplicationService,
  ) {
    this.normalSetting$ = this.normalAskSettingApp.getLatest$();
    this.renewableSetting$ = this.renewableAskSettingApp.getLatest$();
  }

  ngOnInit(): void {}

  async onSubmitNormal($event: SetNormalOnSubmitEvent) {
    await this.normalAskSettingApp.create(new NormalAskSetting({ price: $event.price, amount: $event.amount }));
  }

  async onSubmitRenewable($event: SetRenewableOnSubmitEvent) {
    await this.renewableAskSettingApp.create(new RenewableAskSetting({ price: $event.price, amount: $event.amount }));
  }
}
