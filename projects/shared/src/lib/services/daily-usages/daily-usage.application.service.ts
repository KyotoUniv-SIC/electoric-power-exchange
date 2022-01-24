import { Injectable } from '@angular/core';
import { DailyUsageService } from './daily-usage.service';
import { DailyUsage } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class DailyUsageApplicationService {
  
  constructor(private readonly dailyUsage: DailyUsageService) {}
}