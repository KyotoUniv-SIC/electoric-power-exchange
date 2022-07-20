import { AdminAccountApplicationService } from '../../admin-accounts/admin-account.application.service';
import { NormalAskHistoryApplicationService } from '../../normal-ask-histories/normal-ask-history.application.service';
import { NormalBidHistoryApplicationService } from '../../normal-bid-histories/normal-bid-history.application.service';
import { RenewableAskHistoryApplicationService } from '../../renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableBidHistoryApplicationService } from '../../renewable-bid-histories/renewable-bid-history.application.service';
import { StudentAccountApplicationService } from '../../student-accounts/student-account.application.service';
import { CSVCommonService } from '../csv-common.service';
import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAskHistory, NormalBidHistory, RenewableAskHistory, RenewableBidHistory } from '@local/common';
import { historyOption } from 'projects/main/src/app/view/admin/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class CsvOrderHistoriesService {
  constructor(
    private readonly csvCommon: CSVCommonService,
    private readonly adminApp: AdminAccountApplicationService,
    private readonly studentsApp: StudentAccountApplicationService,
    private readonly normalBidHistoryApp: NormalBidHistoryApplicationService,
    private readonly normalAskHistoryApp: NormalAskHistoryApplicationService,
    private readonly renewableBidHistoryApp: RenewableBidHistoryApplicationService,
    private readonly renewableAskHistoryApp: RenewableAskHistoryApplicationService,
  ) {}

  async downloadNormalBids(option: historyOption) {
    const bids = await this.normalBidHistoryApp.listAll();
    const sortContractBids = option.onlyContracted ? bids.filter((bid) => bid.is_accepted) : bids;
    const filteredBids = sortContractBids
      .filter((bid) => (bid.bid_created_at as Timestamp).toDate() > option.start)
      .filter((bid) => (bid.bid_created_at as Timestamp).toDate() < option.end);
    if (!filteredBids || !filteredBids.length) {
      alert('データが存在しません');
      return;
    }
    const admin = await this.adminApp.getByName('admin');
    const students = await this.studentsApp.list();
    const bidsData = filteredBids.map((data) => {
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

  async downloadNormalAsks(option: historyOption) {
    const asks = await this.normalAskHistoryApp.listAll();
    const sortContractAsks = option.onlyContracted ? asks.filter((ask) => ask.is_accepted) : asks;
    const filteredAsks = sortContractAsks
      .filter((ask) => (ask.ask_created_at as Timestamp).toDate() > option.start)
      .filter((ask) => (ask.ask_created_at as Timestamp).toDate() < option.end);
    if (!filteredAsks || !filteredAsks.length) {
      alert('データが存在しません');
      return;
    }
    const admin = await this.adminApp.getByName('admin');
    const students = await this.studentsApp.list();
    const asksData = filteredAsks.map((data) => {
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

  async downloadRenewableBids(option: historyOption) {
    const bids = await this.renewableBidHistoryApp.listAll();
    const sortContractBids = option.onlyContracted ? bids.filter((bid) => bid.is_accepted) : bids;
    const filteredBids = sortContractBids
      .filter((bid) => (bid.bid_created_at as Timestamp).toDate() > option.start)
      .filter((bid) => (bid.bid_created_at as Timestamp).toDate() < option.end);
    if (!filteredBids || !filteredBids.length) {
      alert('データが存在しません');
      return;
    }
    const admin = await this.adminApp.getByName('admin');
    const students = await this.studentsApp.list();
    const bidsData = filteredBids.map((data) => {
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

  async downloadRenewableAsks(option: historyOption) {
    const asks = await this.renewableAskHistoryApp.listAll();
    const sortContractAsks = option.onlyContracted ? asks.filter((ask) => ask.is_accepted) : asks;
    const filteredAsks = sortContractAsks
      .filter((ask) => (ask.ask_created_at as Timestamp).toDate() > option.start)
      .filter((ask) => (ask.ask_created_at as Timestamp).toDate() < option.end);
    if (!filteredAsks || !filteredAsks.length) {
      alert('データが存在しません');
      return;
    }
    const admin = await this.adminApp.getByName('admin');
    const students = await this.studentsApp.list();
    const asksData = filteredAsks.map((data) => {
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
