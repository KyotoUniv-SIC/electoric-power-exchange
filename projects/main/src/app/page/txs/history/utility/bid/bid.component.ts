import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalBidHistory, PrimaryBid } from '@local/common';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { PrimaryBidApplicationService } from 'projects/shared/src/lib/services/primary-bids/primary-bid.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  normalBid$: Observable<NormalBidHistory | undefined> | undefined;
  primaryBid$: Observable<PrimaryBid | undefined> | undefined;
  createdAt$: Observable<Date | null> | undefined;
  bidCreatedAt$: Observable<Date | null> | undefined;
  createdAtPrimary$: Observable<Date | null> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalBidApp: NormalBidHistoryApplicationService,
    private readonly primaryBidApp: PrimaryBidApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.normalBid$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.normalBidApp.get$(studentAccount.id, historyID)),
    );
    this.createdAt$ = this.normalBid$.pipe(map((bid) => (!bid ? null : (bid?.created_at as Timestamp).toDate())));
    this.bidCreatedAt$ = this.normalBid$.pipe(map((bid) => (!bid ? null : (bid?.bid_created_at as Timestamp).toDate())));
    this.primaryBid$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.primaryBidApp.get$(studentAccount.id, historyID)),
    );
    this.createdAtPrimary$ = this.primaryBid$.pipe(map((bid) => (!bid ? null : (bid?.created_at as Timestamp).toDate())));
  }

  ngOnInit(): void {}
}
