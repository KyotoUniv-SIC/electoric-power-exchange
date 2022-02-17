import { Injectable } from '@angular/core';
import { RenewableAskSettingService } from './renewable-ask-setting.service';
import { RenewableAskSetting } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskSettingApplicationService {
  
  constructor(private readonly renewableAskSetting: RenewableAskSettingService) {}
}