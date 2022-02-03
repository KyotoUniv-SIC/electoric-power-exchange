import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { StudentAccount } from '@local/common';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { PrimaryBidApplicationService } from 'projects/shared/src/lib/services/primary-bids/primary-bid.application.service';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export interface Order {
  id: string;
  date: Date;
  amount: number;
  price: number;
  is_solar: boolean;
  is_bid: boolean;
}

export interface History {
  id: string;
  date: Date;
  amount: number;
  price: number;
  contract_price: number;
  is_accepted: boolean;
  is_solar: boolean;
  is_bid: boolean;
}

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  orders$: Observable<Order[]> | undefined;
  histories$: Observable<History[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly primaryBidApp: PrimaryBidApplicationService,
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly renewableBidApp: RenewableBidApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly normalBidHistoryApp: NormalBidHistoryApplicationService,
    private readonly normalAskHistoryApp: NormalAskHistoryApplicationService,
    private readonly renewableBidHistoryApp: RenewableBidHistoryApplicationService,
    private readonly renewableAskHistoryApp: RenewableAskHistoryApplicationService,
  ) {
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));

    const normalBids$ = this.studentAccount$.pipe(mergeMap((account) => this.normalBidApp.list$(account.id)));
    const normalAsks$ = this.studentAccount$.pipe(mergeMap((account) => this.normalAskApp.list$(account.id)));
    const renewableBids$ = this.studentAccount$.pipe(mergeMap((account) => this.renewableBidApp.list$(account.id)));
    const renewableAsks$ = this.studentAccount$.pipe(mergeMap((account) => this.renewableAskApp.list$(account.id)));
    const now = new Date();
    let firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setHours(0, 0, 0, 0);

    this.orders$ = combineLatest([normalBids$, normalAsks$, renewableBids$, renewableAsks$]).pipe(
      map(([normalBids, normalAsks, renewableBids, renewableAsks]) => {
        const normalBidList = normalBids
          .filter((bid) => bid.is_deleted == false)
          .map((bid) => ({
            id: bid.id,
            date: !bid.created_at ? now : (bid.created_at as Timestamp).toDate(),
            amount: bid.amount,
            price: bid.price,
            is_solar: false,
            is_bid: true,
          }));
        const normalAskList = normalAsks
          .filter((ask) => ask.is_deleted == false)
          .map((ask) => ({
            id: ask.id,
            date: !ask.created_at ? now : (ask.created_at as Timestamp).toDate(),
            amount: ask.amount,
            price: ask.price,
            is_solar: false,
            is_bid: false,
          }));
        const renewableBidList = renewableBids
          .filter((bid) => bid.is_deleted == false)
          .map((bid) => ({
            id: bid.id,
            date: !bid.created_at ? now : (bid.created_at as Timestamp).toDate(),
            amount: bid.amount,
            price: bid.price,
            is_solar: true,
            is_bid: true,
          }));
        const renewableAskList = renewableAsks
          .filter((ask) => ask.is_deleted == false)
          .map((ask) => ({
            id: ask.id,
            date: !ask.created_at ? now : (ask.created_at as Timestamp).toDate(),
            amount: ask.amount,
            price: ask.price,
            is_solar: true,
            is_bid: false,
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

    const primaryBid$ = this.studentAccount$.pipe(mergeMap((account) => this.primaryBidApp.list$(account.id)));
    const normalBidHistories$ = this.studentAccount$.pipe(mergeMap((account) => this.normalBidHistoryApp.list$(account.id)));
    const normalAskHistories$ = this.studentAccount$.pipe(mergeMap((account) => this.normalAskHistoryApp.list$(account.id)));
    const renewableBidHistories$ = this.studentAccount$.pipe(mergeMap((account) => this.renewableBidHistoryApp.list$(account.id)));
    const renewableAskHistories$ = this.studentAccount$.pipe(mergeMap((account) => this.renewableAskHistoryApp.list$(account.id)));

    this.histories$ = combineLatest([
      primaryBid$,
      normalBidHistories$,
      normalAskHistories$,
      renewableBidHistories$,
      renewableAskHistories$,
    ]).pipe(
      map(([primaryBids, normalBids, normalAsks, renewableBids, renewableAsks]) => {
        const primaryBidList = primaryBids.map((bid) => ({
          id: bid.id,
          date: !bid.created_at ? now : (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          contract_price: bid.price,
          is_accepted: true,
          is_solar: false,
          is_bid: true,
        }));

        const normalBidList = normalBids.map((bid) => ({
          id: bid.id,
          date: !bid.created_at ? now : (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          contract_price: bid.contract_price,
          is_accepted: bid.is_accepted,
          is_solar: false,
          is_bid: true,
        }));
        const normalAskList = normalAsks.map((ask) => ({
          id: ask.id,
          date: !ask.created_at ? now : (ask.created_at as Timestamp).toDate(),
          amount: ask.amount,
          price: ask.price,
          contract_price: ask.contract_price,
          is_accepted: ask.is_accepted,
          is_solar: false,
          is_bid: false,
        }));
        const renewableBidList = renewableBids.map((bid) => ({
          id: bid.id,
          date: !bid.created_at ? now : (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          contract_price: bid.contract_price,
          is_accepted: bid.is_accepted,
          is_solar: true,
          is_bid: true,
        }));
        const renewableAskList = renewableAsks.map((ask) => ({
          id: ask.id,
          date: !ask.created_at ? now : (ask.created_at as Timestamp).toDate(),
          amount: ask.amount,
          price: ask.price,
          contract_price: ask.contract_price,
          is_accepted: ask.is_accepted,
          is_solar: true,
          is_bid: false,
        }));
        return primaryBidList
          .concat(normalBidList, normalAskList, renewableBidList, renewableAskList)
          .filter((history) => history.date > firstDay)
          .sort(function (first, second) {
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
  }

  ngOnInit(): void {}
}
