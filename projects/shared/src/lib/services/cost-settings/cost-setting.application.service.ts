import { Injectable } from '@angular/core';
import { CostSettingService } from './cost-setting.service';
import { CostSetting } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class CostSettingApplicationService {
  
  constructor(private readonly costSetting: CostSettingService) {}
}