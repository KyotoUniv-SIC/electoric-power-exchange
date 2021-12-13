import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NormalBidHistory } from '@local/common';
import { NormalBidHistoryApplicationService } from 'projects/shared/src/lib/services/normal-bid-histories/normal-bid-history.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  normalBid$: Observable<NormalBidHistory | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly normalBidApp: NormalBidHistoryApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.normalBid$ = historyID$.pipe(mergeMap((historyID) => this.normalBidApp.get$(accountID, historyID)));
  }

  ngOnInit(): void {}
}
