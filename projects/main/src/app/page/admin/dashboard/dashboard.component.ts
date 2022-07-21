import { DateRange, historyOption, OrderData } from '../../../view/admin/dashboard/dashboard.component';
import { Ranking } from '../../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableBid,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
  StudentAccount,
} from '@local/common';
import { ChartDataSets } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import { ChartMonthlyUsageService } from 'projects/shared/src/lib/services/charts/chart-monthly-usages/chart-monthly-usage.service';
import { CsvDailyUsagesService } from 'projects/shared/src/lib/services/csvs/csv-daily-usages/csv-daily-usages.service';
import { CsvDownloadService } from 'projects/shared/src/lib/services/csvs/csv-downloads/csv-download.service';
import { CsvOrderHistoriesService } from 'projects/shared/src/lib/services/csvs/csv-order-histories/csv-order-histories.service';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  students$: Observable<StudentAccount[]>;
  totalBalanceData$: Observable<MultiDataSet> | undefined;
  totalUsageData$: Observable<ChartDataSets[]> | undefined;
  rankings$: Observable<Ranking[]> | undefined;
  normalAsks$: Observable<NormalAsk[]> | undefined;
  normalBids$: Observable<NormalBid[]> | undefined;
  renewableAsks$: Observable<RenewableAsk[]> | undefined;
  renewableBids$: Observable<RenewableBid[]> | undefined;
  singlePriceNormal$: Observable<SinglePriceNormalSettlement> | undefined;
  singlePriceNormalDate$: Observable<Date> | undefined;
  singlePriceRenewable$: Observable<SinglePriceRenewableSettlement> | undefined;
  singlePriceRenewableDate$: Observable<Date> | undefined;

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
    private readonly csvHistories: CsvOrderHistoriesService,
    private readonly csvDownload: CsvDownloadService,
    private readonly csvDailyUsages: CsvDailyUsagesService,
    private readonly chartMonthlyUsage: ChartMonthlyUsageService,
  ) {
    let firstDay = new Date();
    firstDay.setUTCDate(1);
    firstDay.setUTCHours(0, 0, 0, 0);
    this.students$ = this.studentsApp.list$();

    this.totalBalanceData$ = this.students$.pipe(
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

    const dailyUsages$ = this.dailyUsageApp.list$();
    this.totalUsageData$ = dailyUsages$.pipe(map((usages) => this.chartMonthlyUsage.createAllMonthlyUsageChartDataSets(usages)));

    this.rankings$ = this.students$.pipe(
      mergeMap((students) =>
        Promise.all(
          students.map((student) =>
            this.dailyUsageApp.getRoom(student.room_id).then((usages) => {
              let count = 0;
              for (const usage of usages) {
                (usage.created_at as Timestamp).toDate() > firstDay ? (count += parseInt(usage.amount_kwh_str)) : count;
              }
              return { id: student.id, name: student.name, kwhAmount: count };
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

    this.singlePriceNormal$ = this.singlePriceNormalApp.getLatest$();
    this.singlePriceNormalDate$ = this.singlePriceNormal$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
    this.singlePriceRenewable$ = this.singlePriceRenewableApp.getLatest$();
    this.singlePriceRenewableDate$ = this.singlePriceRenewable$.pipe(map((single) => (single.market_date as Timestamp).toDate()));
  }

  ngOnInit(): void {}

  async onDownloadBalances() {
    this.csvDownload.downloadBalances();
  }

  async onDownloadOrders($event: OrderData) {
    this.csvDownload.downloadOrders($event.students, $event.normalBids, $event.normalAsks, $event.renewableBids, $event.renewableAsks);
  }

  async onDownloadUserUsages($event: Ranking[]) {
    this.csvDownload.downloadUserUsages($event);
  }

  async onDownloadMonthlyUsages($event: ChartDataSets[]) {
    this.csvDownload.downloadMonthlyUsages($event);
  }

  async onDownloadNormalBids($event: historyOption) {
    this.csvHistories.downloadNormalBids($event);
  }

  async onDownloadNormalAsks($event: historyOption) {
    await this.csvHistories.downloadNormalAsks($event);
  }

  async onDownloadRenewableBids($event: historyOption) {
    this.csvHistories.downloadRenewableBids($event);
  }

  async onDownloadRenewableAsks($event: historyOption) {
    await this.csvHistories.downloadRenewableAsks($event);
  }

  async onDownloadUsages($event: DateRange) {
    await this.csvDailyUsages.downloadDailyUsages($event);
  }

  async onDownloadPayments($event: DateRange) {
    await this.csvDailyUsages.downloadDailyPayments($event);
  }
}
