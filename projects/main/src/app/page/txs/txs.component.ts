import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NormalAsk,
  NormalAskHistory,
  NormalBid,
  NormalBidHistory,
  proto,
  RenewableAsk,
  RenewableAskHistory,
  RenewableBid,
  RenewableBidHistory,
} from '@local/common';
import { getAuth } from 'firebase/auth';
import { account } from 'functions/src/accounts';
import * as Long from 'long';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-ask/normal-ask.application.service';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-ask/renewable-ask.application.service';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bid/renewable-bid.application.service';
import { combineLatest, Observable, of } from 'rxjs';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css'],
})
export class TxsComponent implements OnInit {
  normalBidOrders$: Observable<NormalBid[]> | undefined;
  normalAskOrders$: Observable<NormalAsk[]> | undefined;
  renewableBidOrders$: Observable<RenewableBid[]> | undefined;
  renewableAskOrders$: Observable<RenewableAsk[]> | undefined;

  normalBidHistories$: Observable<NormalBidHistory[]> | undefined;
  normalAskHistories$: Observable<NormalAskHistory[]> | undefined;
  renewableBidHistories$: Observable<RenewableBidHistory[]> | undefined;
  renewableAskHistories$: Observable<RenewableAskHistory[]> | undefined;

  constructor(
    private route: ActivatedRoute,
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
    this.normalBidOrders$ = this.normalBidApp.list$(accountID);
    this.normalBidHistories$ = this.normalBidHistoryApp.list$(accountID);
    this.normalAskHistories$ = this.normalAskHistoryApp.list$(accountID);
    this.renewableBidHistories$ = this.renewableBidHistoryApp.list$(accountID);
    this.renewableAskHistories$ = this.renewableAskHistoryApp.list$(accountID);
  }

  ngOnInit(): void {}
}
