import { AdminAccountApplicationService } from '../../admin-accounts/admin-account.application.service';
import { StudentAccountApplicationService } from '../../student-accounts/student-account.application.service';
import { CSVCommonService } from '../csv-common.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAskHistory, NormalBidHistory, RenewableAskHistory, RenewableBidHistory } from '@local/common';
import { DateRange } from 'projects/main/src/app/view/admin/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class CsvOrderHistoriesService {
  constructor(
    private readonly csvCommon: CSVCommonService,
    private readonly adminApp: AdminAccountApplicationService,
    private readonly studentsApp: StudentAccountApplicationService,
  ) {}

  async downloadNormalBids($event: DateRange) {
    const admin = await this.adminApp.getByName('admin');
    const normalBids = $event.data as NormalBidHistory[];
    const students = await this.studentsApp.list();
    const bidsData = normalBids.map((data) => {
      return {
        bid_id: data.id,
        account_id: data.account_id,
        account_name: admin?.id == data.account_id ? admin.name : students.find((student) => student.id == data.account_id)?.name,
        price: parseInt(data.price_ujpy) / 1000000,
        amount: parseInt(data.amount_uupx) / 1000000,
        contract: data.is_accepted ? 'YES' : 'NO',
        contract_price: parseInt(data.contract_price_ujpy) / 1000000,
        timestamp: (data.bid_created_at as Timestamp).toDate().toLocaleString(),
      };
    });
    const csv = this.csvCommon.jsonToCsv(bidsData, ',');
    this.csvCommon.downloadCsv(csv, 'upx_bid_history');
  }

  async downloadNormalAsks($event: DateRange) {
    const admin = await this.adminApp.getByName('admin');
    const normalAsks = $event.data as NormalAskHistory[];
    const students = await this.studentsApp.list();
    const asksData = normalAsks.map((data) => {
      return {
        ask_id: data.id,
        account_id: data.account_id,
        account_name: admin?.id == data.account_id ? admin.name : students.find((student) => student.id == data.account_id)?.name,
        price: parseInt(data.price_ujpy) / 1000000,
        amount: parseInt(data.amount_uupx) / 1000000,
        contract: data.is_accepted ? 'YES' : 'NO',
        contract_price: parseInt(data.contract_price_ujpy) / 1000000,
        timestamp: (data.ask_created_at as Timestamp).toDate().toLocaleString(),
      };
    });
    const csv = this.csvCommon.jsonToCsv(asksData, ',');
    this.csvCommon.downloadCsv(csv, 'upx_ask_history');
  }

  async downloadRenewableBids(range: DateRange) {
    const admin = await this.adminApp.getByName('admin');
    const renewableBids = range.data as RenewableBidHistory[];
    const students = await this.studentsApp.list();
    const bidsData = renewableBids.map((data) => {
      return {
        bid_id: data.id,
        account_id: data.account_id,
        account_name: admin?.id == data.account_id ? admin.name : students.find((student) => student.id == data.account_id)?.name,
        price: parseInt(data.price_ujpy) / 1000000,
        amount: parseInt(data.amount_uspx) / 1000000,
        contract: data.is_accepted ? 'YES' : 'NO',
        contract_price: parseInt(data.contract_price_ujpy) / 1000000,
        timestamp: (data.bid_created_at as Timestamp).toDate().toLocaleString(),
      };
    });
    const csv = this.csvCommon.jsonToCsv(bidsData, ',');
    this.csvCommon.downloadCsv(csv, 'spx_bid_history');
  }

  async downloadRenewableAsks(range: DateRange) {
    const admin = await this.adminApp.getByName('admin');
    const renewableAsks = range.data as RenewableAskHistory[];
    const students = await this.studentsApp.list();
    const asksData = renewableAsks.map((data) => {
      return {
        ask_id: data.id,
        account_id: data.account_id,
        account_name: admin?.id == data.account_id ? admin.name : students.find((student) => student.id == data.account_id)?.name,
        price: parseInt(data.price_ujpy) / 1000000,
        amount: parseInt(data.amount_uspx) / 1000000,
        contract: data.is_accepted ? 'YES' : 'NO',
        contract_price: parseInt(data.contract_price_ujpy) / 1000000,
        timestamp: (data.ask_created_at as Timestamp).toDate().toLocaleString(),
      };
    });
    const csv = this.csvCommon.jsonToCsv(asksData, ',');
    this.csvCommon.downloadCsv(csv, 'spx_ask_history');
  }
}
