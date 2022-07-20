import { DailyUsageApplicationService } from '../../daily-usages/daily-usage.application.service';
import { DailyPaymentApplicationService } from '../../student-accounts/daily-payments/daily-payment.application.service';
import { StudentAccountApplicationService } from '../../student-accounts/student-account.application.service';
import { CSVCommonService } from '../csv-common.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DailyPayment } from '@local/common';
import { DateRange } from 'projects/main/src/app/view/admin/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class CsvDailyUsagesService {
  constructor(
    private readonly csvCommon: CSVCommonService,
    private readonly studentApp: StudentAccountApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly dailyPaymentApp: DailyPaymentApplicationService,
  ) {}

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

  async downloadDailyPayments(range: DateRange) {
    const students = await this.studentApp.list();
    let dailyPayments: DailyPayment[] = [];
    for (let student of students) {
      const payments = await this.dailyPaymentApp.list(student.id);
      const filteredPayment = payments
        .filter((payment) => (payment.created_at as Timestamp).toDate() > range.start)
        .filter((payment) => (payment.created_at as Timestamp).toDate() < range.end);
      Array.prototype.push.apply(dailyPayments, filteredPayment);
    }
    if (!dailyPayments.length) {
      alert('データが存在しません。範囲指定は各日0時が基準です。');
      return;
    }
    const paymentsData = dailyPayments
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
      })
      .map((data) => {
        const studentName = students.find((student) => student.id == data.student_account_id)?.name;
        return {
          id: data.id,
          account_id: data.student_account_id,
          account_name: studentName,
          usage_amount_kwh: parseInt(data.amount_mwh) / 1000000,
          amount_upx: parseInt(data.amount_uupx) / 1000000,
          amount_spx: parseInt(data.amount_uspx) / 1000000,
          amount_insufficiency: parseInt(data.amount_insufficiency) / 1000000,
          timestamp: (data.created_at as Timestamp).toDate().toLocaleString(),
        };
      });
    const csv = this.csvCommon.jsonToCsv(paymentsData, ',');
    this.csvCommon.downloadCsv(csv, 'daily_usages');
  }
}
