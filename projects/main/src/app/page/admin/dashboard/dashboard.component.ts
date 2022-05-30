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

export interface BalanceData {
  student_account_id: string;
  student_account_name: string | undefined;
  amount_uupx: string;
  amount_uspx: string;
}

export interface OrderData {
  id: string;
  student_account_name: string | undefined;
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
  balances$: Observable<BalanceData[]>;
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
      mergeMap((balances) =>
        Promise.all(
          balances.map((balance) =>
            this.studentsApp.get(balance.student_account_id).then((student) => ({
              student_account_id: balance.student_account_id,
              student_account_name: student?.name,
              amount_uupx: balance.amount_uupx,
              amount_uspx: balance.amount_uspx,
            })),
          ),
        ),
      ),
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
        return [[upxTotal, spxTotal]];
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
            student_account_name: !users.find((user) => user.id == bid.account_id)?.name
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
            student_account_name: !users.find((user) => user.id == ask.account_id)?.name
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
            student_account_name: !users.find((user) => user.id == bid.account_id)?.name
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
            student_account_name: !users.find((user) => user.id == ask.account_id)?.name
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
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = document.createElement('a');
    link.download = title + '.csv';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async onDownloadBalances($event: BalanceData[]) {
    // ここでJSON=>CSVの変換とダウンロードを行う
    const csv = this.jsonToCsv($event, ',');
    this.downloadCsv(csv, 'balances');
  }

  async onDownloadOrders($event: OrderData[]) {
    const csv = this.jsonToCsv($event, ',');
    this.downloadCsv(csv, 'orders');
  }

  async onDownloadUserUsages($event: Ranking[]) {
    const csv = this.jsonToCsv($event, ',');
    this.downloadCsv(csv, 'users_usages');
  }

  async onDownloadMonthlyUsages($event: MonthlyUsageData[]) {
    const csv = this.jsonToCsv($event, ',');
    this.downloadCsv(csv, 'monthly_usages');
  }
}
