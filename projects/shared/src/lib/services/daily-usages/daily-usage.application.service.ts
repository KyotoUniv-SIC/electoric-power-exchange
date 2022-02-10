import { DailyUsageService } from './daily-usage.service';
import { Injectable } from '@angular/core';
import { DailyUsage } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DailyUsageApplicationService {
  constructor(private readonly dailyUsage: DailyUsageService) {}
  list() {
    return this.dailyUsage.list();
  }

  getRoom(roomID: string) {
    return this.dailyUsage.list().then((params) => params.filter((param) => param.room_id == roomID));
  }

  list$() {
    return this.dailyUsage.list$();
  }

  getRoom$(roomID: string) {
    return this.dailyUsage.list$().pipe(map((params) => params.filter((param) => param.room_id == roomID)));
  }
}
