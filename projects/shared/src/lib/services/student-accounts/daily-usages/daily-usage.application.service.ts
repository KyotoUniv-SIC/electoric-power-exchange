import { DailyUsageService } from './daily-usage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DailyUsageApplicationService {
  constructor(private readonly dailyUsage: DailyUsageService) {}

  list$(uid: string) {
    return this.dailyUsage.list$(uid);
  }
}
