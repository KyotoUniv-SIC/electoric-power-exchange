import { AdminAccountApplicationService } from '../../admin-accounts/admin-account.application.service';
import { BalanceApplicationService } from '../../student-accounts/balances/balance.application.service';
import { InsufficientBalanceApplicationService } from '../../student-accounts/insufficient-balances/insufficient-balance.application.service';
import { StudentAccountApplicationService } from '../../student-accounts/student-account.application.service';
import { CSVCommonService } from '../csv-common.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Balance } from '@local/common';
import { MonthlyUsageData, OrderData } from 'projects/main/src/app/page/admin/dashboard/dashboard.component';
import { Ranking } from 'projects/main/src/app/page/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class CsvdownloadService {
  constructor(
    private readonly csvCommon: CSVCommonService,
    private readonly adminApp: AdminAccountApplicationService,
    private readonly studentsApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,

    private readonly insufficientBalanceApp: InsufficientBalanceApplicationService,
  ) {}

  async downloadBalances(balances: Balance[]) {
    // ここでJSON=>CSVの変換とダウンロードを行う
    const students = await this.studentsApp.list();
    let studentInsufficiencies: { account_id: string; account_name: string; insufficient_utoken: number }[] = [];
    for (let student of students) {
      const insufficiencies = await this.insufficientBalanceApp.list(student.id);
      studentInsufficiencies.push({
        account_id: student.id,
        account_name: student.name,
        insufficient_utoken: insufficiencies.reduce((previous, current) => previous + parseInt(current.amount_utoken), 0),
      });
    }
    const balanceData = balances.map((balance) => {
      return {
        account_id: balance.student_account_id,
        account_name: students.find((student) => student.id == balance.student_account_id)?.name,
        amount_uupx: balance.amount_uupx,
        amount_uspx: balance.amount_uspx,
        insufficient_utoken: studentInsufficiencies.find((insufficiency) => (insufficiency.account_id = balance.student_account_id))
          ?.insufficient_utoken,
        timestamp: (balance.updated_at as Timestamp).toDate().toLocaleString(),
      };
    });
    const csv = this.csvCommon.jsonToCsv(balanceData, ',');
    this.csvCommon.downloadCsv(csv, 'balances');
  }

  async downloadOrders(orders: OrderData[]) {
    const csv = this.csvCommon.jsonToCsv(orders, ',');
    this.csvCommon.downloadCsv(csv, 'orders');
  }

  async downloadUserUsages(ranks: Ranking[]) {
    let usages = [];
    for (let data of ranks) {
      const balance = await this.balanceApp.list(data.id);
      const insufficiencies = await this.insufficientBalanceApp.list(data.id);
      usages.push({
        rank: data.rank,
        account_id: data.id,
        account_name: data.name,
        usage_kwh: data.kwhAmount,
        amount_uupx: balance[0].amount_uupx,
        amount_uspx: balance[0].amount_uspx,
        amount_insufficient_utoken: insufficiencies.reduce((previous, current) => previous + parseInt(current.amount_utoken), 0),
      });
    }
    const csv = this.csvCommon.jsonToCsv(usages, ',');
    this.csvCommon.downloadCsv(csv, 'users_usages');
  }

  async downloadMonthlyUsages(usages: MonthlyUsageData[]) {
    const csv = this.csvCommon.jsonToCsv(usages, ',');
    this.csvCommon.downloadCsv(csv, 'monthly_usages');
  }
}
