import { DailyUsageApplicationService } from '../../daily-usages/daily-usage.application.service';
import { CSVCommonService } from '../csv-common.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DateRange } from 'projects/main/src/app/view/admin/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class CsvDailyUsagesService {
  constructor(private readonly csvCommon: CSVCommonService, private readonly dailyUsageApp: DailyUsageApplicationService) {}

  async downloadDailyUsages(range: DateRange) {
    const usages = await this.dailyUsageApp.list();
    const filteredUsages = usages
      .filter((usage) => (usage.created_at as Timestamp).toDate() > range.start)
      .filter((usage) => (usage.created_at as Timestamp).toDate() < range.end)
      // 昇順に並び替え
      .sort((first, second) => {
        if (!first.created_at) {
          return -1;
        } else if (!second.created_at) {
          return 1;
        } else {
          if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
            return -1;
          } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    if (!filteredUsages || !filteredUsages.length) {
      alert('データが存在しません。範囲指定は各日0時が基準です。');
      return;
    }
    const usagesData = filteredUsages.map((data) => {
      return {
        id: data.id,
        room_id: data.room_id,
        usage_amount_kwh: data.amount_kwh_str,
        timestamp: (data.created_at as Timestamp).toDate().toLocaleString(),
      };
    });
    const csv = this.csvCommon.jsonToCsv(usagesData, ',');
    this.csvCommon.downloadCsv(csv, 'all_daily_usages');
  }
}
