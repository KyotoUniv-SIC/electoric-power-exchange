import { Ranking } from '../../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  Balance,
  NormalAsk,
  NormalBid,
  RenewableAsk,
  RenewableBid,
  SinglePriceNormalSettlement,
  SinglePriceRenewableSettlement,
} from '@local/common';
import { ChartDataSets } from 'chart.js';
import { MultiDataSet } from 'ng2-charts';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { SinglePriceNormalSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-normal-settlements/single-price-normal-settlement.application.service';
import { SinglePriceRenewableSettlementApplicationService } from 'projects/shared/src/lib/services/single-price-renewable-settlements/single-price-renewable-settlement.application.service';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  balances$: Observable<Balance[]>;
  totalBalanceData$: Observable<MultiDataSet> | undefined;
  totalUsageThisYear$: Observable<number[]> | undefined;
  totalUsageLastYear$: Observable<number[]> | undefined;
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
  ) {
    const now = new Date();
    let firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setHours(0, 0, 0, 0);
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
          upxTotal += balance.amount_upx;
          spxTotal += balance.amount_spx;
        });
        return [[upxTotal, spxTotal]];
      }),
    );

    const usageListDailyTotal$ = this.dailyUsageApp.list$();
    this.totalUsageThisYear$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let list = [];
        for (let i = 0; i < 12; i++) {
          const thisMonth = new Date(now.getFullYear(), i, 1);
          const nextMonth = new Date(now.getFullYear(), i + 1, 1);
          let usage = usages.reduce(
            (sum, element) =>
              thisMonth < (element.created_at as Timestamp).toDate() && (element.created_at as Timestamp).toDate() < nextMonth
                ? sum + element.amount_kwh
                : sum,
            0,
          );
          list.push(usage);
        }
        return list;
      }),
    );
    this.totalUsageLastYear$ = usageListDailyTotal$.pipe(
      map((usages) => {
        let list = [];
        for (let i = 0; i < 12; i++) {
          const thisMonth = new Date(now.getFullYear() - 1, i, 1);
          const nextMonth = new Date(now.getFullYear() - 1, i + 1, 1);
          let usage = usages.reduce(
            (sum, element) =>
              thisMonth < (element.created_at as Timestamp).toDate() && (element.created_at as Timestamp).toDate() < nextMonth
                ? sum + element.amount_kwh
                : sum,
            0,
          );
          list.push(usage);
        }
        return list;
      }),
    );
    this.totalUsageData$ = combineLatest([this.totalUsageThisYear$, this.totalUsageLastYear$]).pipe(
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
                (usage.created_at as Timestamp).toDate() > firstDay ? (count += usage.amount_kwh) : count;
              }
              return { id: user.id, name: user.name, amount: count };
            }),
          ),
        ),
      ),
      map((rankings) => rankings.sort((first, second) => second.amount - first.amount)),
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

  jsonToCsv(json: any[], delimiter: string | undefined) {
    var header = Object.keys(json[0]).join(delimiter) + '\n';
    var body = json
      .map(function (d) {
        return Object.keys(d)
          .map(function (key) {
            return d[key];
          })
          .join(delimiter);
      })
      .join('\n');
    return header + body;
  }

  downloadCsv(csv: string, title: string) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = document.createElement('a');
    link.download = title + '.csv';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async onDownloadBalances($event: Balance[]) {
    // ここでJSON=>CSVの変換とダウンロードを行う
    const data = $event.map((balance) => ({
      student_account_id: balance.student_account_id,
      amount_upx: balance.amount_upx,
      amount_spx: balance.amount_spx,
    }));
    const csv = this.jsonToCsv(data, ',');
    this.downloadCsv(csv, 'balances');
  }

  async onDownloadOrders($event: [NormalBid[], NormalAsk[], RenewableBid[], RenewableAsk[]]) {}

  async onDownloadUserUsages($event: Ranking[]) {}

  async onDownloadMonthlyUsages($event: [number[], number[]]) {}
}
