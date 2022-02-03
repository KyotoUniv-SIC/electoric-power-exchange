import { MonthlyUsageService } from './monthly-usage.service';
import { Injectable } from '@angular/core';
import { MonthlyUsage } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class MonthlyUsageApplicationService {
  constructor(private readonly monthlyUsage: MonthlyUsageService) {}

  list(uid: string) {
    return this.monthlyUsage.list(uid);
  }

  list$(uid: string) {
    return this.monthlyUsage.list$(uid);
  }
}
