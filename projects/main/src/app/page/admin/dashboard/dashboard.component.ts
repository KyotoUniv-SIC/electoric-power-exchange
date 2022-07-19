import { DateRange, historyData } from '../../../view/admin/dashboard/dashboard.component';
import { Ranking } from '../../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  Balance,
  NormalAsk,
  NormalAskHistory,
  NormalBid,
  NormalBidHistory,
  RenewableAsk,
  RenewableAskHistory,
  RenewableBid,
  RenewableBidHistory,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartDataSets } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import { CsvDailyUsagesService } from 'projects/shared/src/lib/services/csvs/csv-daily-usages/csv-daily-usages.service';
import { CsvdownloadService } from 'projects/shared/src/lib/services/csvs/csv-downloads/csv-download.service';
import { CsvOrderHistoriesService } from 'projects/shared/src/lib/services/csvs/csv-order-histories/csv-order-histories.service';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export interface OrderData {
  id: string;
  account_id: string;
  account_name: string | undefined;
  date: string;
  amount_utoken: string;
  price_ujpy: string;
  power_type: string;
  order_type: string;
}

export interface MonthlyUsageData {
  year: number;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  balances$: Observable<Balance[]>;
  totalBalanceData$: Observable<MultiDataSet> | undefined;
  totalUsage$: Observable<MonthlyUsageData[]> | undefined;
  totalUsageData$: Observable<ChartDataSets[]> | undefined;
  rankings$: Observable<Ranking[]> | undefined;
  normalAsks$: Observable<NormalAsk[]> | undefined;
  normalBids$: Observable<NormalBid[]> | undefined;
  renewableAsks$: Observable<RenewableAsk[]> | undefined;
  renewableBids$: Observable<RenewableBid[]> | undefined;
  orders$: Observable<OrderData[]> | undefined;
  singlePriceNormal$: Observable<SinglePriceNormalSettlement> | undefined;
  singlePriceNormalDate$: Observable<Date> | undefined;
  singlePriceRenewable$: Observable<SinglePriceRenewableSettlement> | undefined;
  singlePriceRenewableDate$: Observable<Date> | undefined;
  normalBidHistories$: Observable<NormalBidHistory[] | undefined>;
  normalAskHistories$: Observable<NormalAskHistory[] | undefined>;
  renewableBidHistories$: Observable<RenewableBidHistory[] | undefined>;
  renewableAskHistories$: Observable<RenewableAskHistory[] | undefined>;

  constructor(
    private readonly studentsApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly renewableBidApp: RenewableBidApplicationService,
    private readonly singlePriceNormalApp: SinglePriceNormalSettlementApplicationService,
    private readonly singlePriceRenewableApp: SinglePriceRenewableSettlementApplicationService,
    private readonly normalBidHistoryApp: NormalBidHistoryApplicationService,
    private readonly normalAskHistoryApp: NormalAskHistoryApplicationService,
    private readonly renewableBidHistoryApp: RenewableBidHistoryApplicationService,
    private readonly renewableAskHistoryApp: RenewableAskHistoryApplicationService,
    private readonly csvHistories: CsvOrderHistoriesService,
    private readonly csvDownload: CsvdownloadService,
    private readonly csvDailyUsages: CsvDailyUsagesService,
  ) {
    const now = new Date();
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    const users$ = this.studentsApp.list$();

    this.balances$ = users$.pipe(
      mergeMap((users) => Promise.all(users.map((user) => this.balanceApp.list(user.id).then((balances) => balances[0])))),
    );

    this.totalBalanceData$ = users$.pipe(
      mergeMap((users) => Promise.all(users.map((user) => this.balanceApp.list(user.id).then((balances) => balances[0])))),
      map((balances) => {
        let upxTotal = 0;
        let spxTotal = 0;
        balances.map((balance) => {
          upxTotal += parseInt(balance.amount_uupx);
          spxTotal += parseInt(balance.amount_uspx);
        });
        return [[upxTotal / 1000000, spxTotal / 1000000]];
      }),
    );

    const usageListDailyTotal$ = this.dailyUsageApp.list$();
    const totalUsageThisYear$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let list = [];
        for (let i = 0; i < 12; i++) {
          const thisMonth = new Date(now.getFullYear(), i, 1);
          const nextMonth = new Date(now.getFullYear(), i + 1, 1);
          let usage = usages.reduce(
            (sum, element) =>
              thisMonth < (element.created_at as Timestamp).toDate() && (element.created_at as Timestamp).toDate() < nextMonth
                ? sum + parseInt(element.amount_kwh_str)
                : sum,
            0,
          );
          list.push(usage);
        }
        return list;
      }),
    );
    const totalUsageLastYear$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let list = [];
        for (let i = 0; i < 12; i++) {
          const thisMonth = new Date(now.getFullYear() - 1, i, 1);
          const nextMonth = new Date(now.getFullYear() - 1, i + 1, 1);
          let usage = usages.reduce(
            (sum, element) =>
              thisMonth < (element.created_at as Timestamp).toDate() && (element.created_at as Timestamp).toDate() < nextMonth
                ? sum + parseInt(element.amount_kwh_str)
                : sum,
            0,
          );
          list.push(usage);
        }
        return list;
      }),
    );
    this.totalUsage$ = combineLatest([totalUsageThisYear$, totalUsageLastYear$]).pipe(
      map(([thisYear, lastYear]) => [
        {
          year: now.getFullYear() - 1,
          jan: lastYear[0],
          feb: lastYear[1],
          mar: lastYear[2],
          apr: lastYear[3],
          may: lastYear[4],
          jun: lastYear[5],
          jul: lastYear[6],
          aug: lastYear[7],
          sep: lastYear[8],
          oct: lastYear[9],
          nov: lastYear[10],
          dec: lastYear[11],
        },
        {
          year: now.getFullYear(),
          jan: thisYear[0],
          feb: thisYear[1],
          mar: thisYear[2],
          apr: thisYear[3],
          may: thisYear[4],
          jun: thisYear[5],
          jul: thisYear[6],
          aug: thisYear[7],
          sep: thisYear[8],
          oct: thisYear[9],
          nov: thisYear[10],
          dec: thisYear[11],
        },
      ]),
    );
    this.totalUsageData$ = combineLatest([totalUsageThisYear$, totalUsageLastYear$]).pipe(
      map(([thisYear, lastYear]) => [
        { data: thisYear, label: 'This year' },
        { data: lastYear, label: 'Last year' },
      ]),
    );

    this.rankings$ = users$.pipe(
      mergeMap((users) =>
        Promise.all(
          users.map((user) =>
            this.dailyUsageApp.getRoom(user.room_id).then((usages) => {
              let count = 0;
              for (const usage of usages) {
                (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh_str)) : count;
              }
              return { id: user.id, name: user.name, kwhAmount: count };
            }),
          ),
        ),
      ),
      // projects/main/src/app/page/dashboard/dashboard.component.ts からのコピペ
      // mapはforEachの機能に加えて新しい配列を返します（forEachは何も返さず、必ずvoidになる）
      map((rankings) => {
        let count = 0;
        let tmp = 0;
        // ここでランキングをソートして、順位をrankに入れる
        let sortedRanking = rankings
          .sort((first, second) => second.kwhAmount - first.kwhAmount)
          .map((item, index) => {
            if (item.kwhAmount !== tmp) {
              count = index + 1;
              tmp = item.kwhAmount;
            }
            // ここのreturnは86行目{}を受けてreturnしてます (85行目Array.map()の返り値)
            return { id: item.id, rank: count, name: item.name, kwhAmount: item.kwhAmount };
          });
        //  ここのreturnは79行目{}を受けてreturnしてます (79行目Observable.map()の返り値)
        return sortedRanking;
      }),
    );
    this.normalAsks$ = this.normalAskApp.list$().pipe(map((asks) => asks.filter((ask) => ask.is_deleted != true)));
    this.normalBids$ = this.normalBidApp.list$().pipe(map((bids) => bids.filter((bid) => bid.is_deleted != true)));
    this.renewableAsks$ = this.renewableAskApp.list$().pipe(map((asks) => asks.filter((ask) => ask.is_deleted != true)));
    this.renewableBids$ = this.renewableBidApp.list$().pipe(map((bids) => bids.filter((bid) => bid.is_deleted != true)));
    this.orders$ = combineLatest([this.normalBids$, this.normalAsks$, this.renewableBids$, this.renewableAsks$, users$]).pipe(
      map(([normalBids, normalAsks, renewableBids, renewableAsks, users]) => {
        const normalBidList = normalBids
          .filter((bid) => bid.is_deleted == false)
          .map((bid) => ({
            id: bid.id,
            account_id: bid.account_id,
            account_name: !users.find((user) => user.id == bid.account_id)?.name
              ? 'System'
              : users.find((user) => user.id == bid.account_id)?.name,
            date: !bid.created_at ? now.toLocaleString() : (bid.created_at as Timestamp).toDate().toLocaleString(),
            amount_utoken: bid.amount_uupx,
            price_ujpy: bid.price_ujpy,
            power_type: 'utility',
            order_type: 'bid',
          }));

        const normalAskList = normalAsks
          .filter((ask) => ask.is_deleted == false)
          .map((ask) => ({
            id: ask.id,
            account_id: ask.account_id,
            account_name: !users.find((user) => user.id == ask.account_id)?.name
              ? 'System'
              : users.find((user) => user.id == ask.account_id)?.name,
            date: !ask.created_at ? now.toLocaleString() : (ask.created_at as Timestamp).toDate().toLocaleString(),
            amount_utoken: ask.amount_uupx,
            price_ujpy: ask.price_ujpy,
            power_type: 'utility',
            order_type: 'ask',
          }));
        const renewableBidList = renewableBids
          .filter((bid) => bid.is_deleted == false)
          .map((bid) => ({
            id: bid.id,
            account_id: bid.account_id,
            account_name: !users.find((user) => user.id == bid.account_id)?.name
              ? 'System'
              : users.find((user) => user.id == bid.account_id)?.name,
            date: !bid.created_at ? now.toLocaleString() : (bid.created_at as Timestamp).toDate().toLocaleString(),
            amount_utoken: bid.amount_uspx,
            price_ujpy: bid.price_ujpy,
            power_type: 'solar',
            order_type: 'bid',
          }));

        const renewableAskList = renewableAsks
          .filter((ask) => ask.is_deleted == false)
          .map((ask) => ({
            id: ask.id,
            account_id: ask.account_id,
            account_name: !users.find((user) => user.id == ask.account_id)?.name
              ? 'System'
              : users.find((user) => user.id == ask.account_id)?.name,
            date: !ask.created_at ? now.toLocaleString() : (ask.created_at as Timestamp).toDate().toLocaleString(),
            amount_utoken: ask.amount_uspx,
            price_ujpy: ask.price_ujpy,
            power_type: 'solar',
            order_type: 'ask',
          }));
        return normalBidList.concat(normalAskList, renewableBidList, renewableAskList).sort(function (first, second) {
          if (first.date > second.date) {
            return -1;
          } else if (first.date < second.date) {
            return 1;
          } else {
            return 0;
          }
        });
      }),
    );

    this.singlePriceNormal$ = this.singlePriceNormalApp.getLatest$();
    this.singlePriceNormalDate$ = this.singlePriceNormal$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.singlePriceRenewable$ = this.singlePriceRenewableApp.getLatest$();
    this.singlePriceRenewableDate$ = this.singlePriceRenewable$.pipe(map((single) => (single.market_date as Timestamp).toDate()));

    this.normalBidHistories$ = this.normalBidHistoryApp.listAll$();
    this.normalAskHistories$ = this.normalAskHistoryApp.listAll$();
    this.renewableBidHistories$ = this.renewableBidHistoryApp.listAll$();
    this.renewableAskHistories$ = this.renewableAskHistoryApp.listAll$();
  }

  ngOnInit(): void {}

  async onDownloadBalances($event: Balance[]) {
    this.csvDownload.downloadBalances($event);
  }

  async onDownloadOrders($event: OrderData[]) {
    this.csvDownload.downloadOrders($event);
  }

  async onDownloadUserUsages($event: Ranking[]) {
    this.csvDownload.downloadUserUsages($event);
  }

  async onDownloadMonthlyUsages($event: MonthlyUsageData[]) {
    this.csvDownload.downloadMonthlyUsages($event);
  }

  async onDownloadNormalBids($event: historyData) {
    this.csvHistories.downloadNormalBids($event);
  }

  async onDownloadNormalAsks($event: historyData) {
    await this.csvHistories.downloadNormalAsks($event);
  }

  async onDownloadRenewableBids($event: historyData) {
    this.csvHistories.downloadRenewableBids($event);
  }

  async onDownloadRenewableAsks($event: historyData) {
    await this.csvHistories.downloadRenewableAsks($event);
  }

  async onDownloadUsages($event: DateRange) {
    await this.csvDailyUsages.downloadDailyUsages($event);
  }
}
