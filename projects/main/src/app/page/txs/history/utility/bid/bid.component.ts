import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
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
  constructor(
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalBidApp: NormalBidHistoryApplicationService,
    private readonly primaryBidApp: PrimaryBidApplicationService,
  ) {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return;
    }
    const studentAccount$ = this.studentAccApp.getByUid$(uid);
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.normalBid$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.normalBidApp.get$(studentAccount.id, historyID)),
    );
    this.primaryBid$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.primaryBidApp.get$(studentAccount.id, historyID)),
    );
  }

  ngOnInit(): void {}
}
