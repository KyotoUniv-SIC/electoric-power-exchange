import { Injectable } from '@angular/core';
import { NormalAskSettingService } from './normal-ask-setting.service';
import { NormalAskSetting } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class NormalAskSettingApplicationService {
  
  constructor(private readonly normalAskSetting: NormalAskSettingService) {}
}