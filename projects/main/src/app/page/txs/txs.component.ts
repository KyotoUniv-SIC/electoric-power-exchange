import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { PrimaryBidApplicationService } from 'projects/shared/src/lib/services/primary-bids/primary-bid.application.service';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  orders$: Observable<Order[]> | undefined;
  histories$: Observable<History[]> | undefined;

  constructor(
    private route: ActivatedRoute,
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
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const normalBids$ = this.normalBidApp.list$(accountID);
    const normalAsks$ = this.normalAskApp.list$(accountID);
    const renewableBids$ = this.renewableBidApp.list$(accountID);
    const renewableAsks$ = this.renewableAskApp.list$(accountID);

    this.orders$ = combineLatest([normalBids$, normalAsks$, renewableBids$, renewableAsks$]).pipe(
      map(([normalBids, normalAsks, renewableBids, renewableAsks]) => {
        const normalBidList = normalBids.map((bid) => ({
          id: bid.id,
          date: (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          is_solar: false,
          is_bid: true,
        }));
        const normalAskList = normalAsks.map((ask) => ({
          id: ask.id,
          date: (ask.created_at as Timestamp).toDate(),
          amount: ask.amount,
          price: ask.price,
          is_solar: false,
          is_bid: false,
        }));
        const renewableBidList = renewableBids.map((bid) => ({
          id: bid.id,
          date: (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          is_solar: true,
          is_bid: true,
        }));
        const renewableAskList = renewableAsks.map((ask) => ({
          id: ask.id,
          date: (ask.created_at as Timestamp).toDate(),
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

    const primaryBid$ = this.primaryBidApp.list$(accountID);
    const normalBidHistories$ = this.normalBidHistoryApp.list$(accountID);
    const normalAskHistories$ = this.normalAskHistoryApp.list$(accountID);
    const renewableBidHistories$ = this.renewableBidHistoryApp.list$(accountID);
    const renewableAskHistories$ = this.renewableAskHistoryApp.list$(accountID);

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
          date: (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          contract_price: bid.price,
          is_accepted: true,
          is_solar: false,
          is_bid: true,
        }));

        const normalBidList = normalBids.map((bid) => ({
          id: bid.id,
          date: (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          contract_price: bid.contract_price,
          is_accepted: bid.is_accepted,
          is_solar: false,
          is_bid: true,
        }));
        const normalAskList = normalAsks.map((ask) => ({
          id: ask.id,
          date: (ask.created_at as Timestamp).toDate(),
          amount: ask.amount,
          price: ask.price,
          contract_price: ask.contract_price,
          is_accepted: ask.is_accepted,
          is_solar: false,
          is_bid: false,
        }));
        const renewableBidList = renewableBids.map((bid) => ({
          id: bid.id,
          date: (bid.created_at as Timestamp).toDate(),
          amount: bid.amount,
          price: bid.price,
          contract_price: bid.contract_price,
          is_accepted: bid.is_accepted,
          is_solar: true,
          is_bid: true,
        }));
        const renewableAskList = renewableAsks.map((ask) => ({
          id: ask.id,
          date: (ask.created_at as Timestamp).toDate(),
          amount: ask.amount,
          price: ask.price,
          contract_price: ask.contract_price,
          is_accepted: ask.is_accepted,
          is_solar: true,
          is_bid: false,
        }));
        return primaryBidList.concat(normalBidList, normalAskList, renewableBidList, renewableAskList).sort(function (first, second) {
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
