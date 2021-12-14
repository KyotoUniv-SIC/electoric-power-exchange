import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { RenewableBidHistory } from '@local/common';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  renewableBid$: Observable<RenewableBidHistory | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly renewableBidApp: RenewableBidHistoryApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.renewableBid$ = historyID$.pipe(mergeMap((historyID) => this.renewableBidApp.get$(accountID, historyID)));
  }

  ngOnInit(): void {}
}
