import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { RenewableBidHistory } from '@local/common';
import { RenewableBidHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-bid-histories/renewable-bid-history.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  renewableBid$: Observable<RenewableBidHistory | undefined> | undefined;
  constructor(
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly renewableBidApp: RenewableBidHistoryApplicationService,
  ) {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return;
    }
    const studentAccount$ = this.studentAccApp.getByUid$(uid);
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.renewableBid$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.renewableBidApp.get$(studentAccount.id, historyID)),
    );
  }

  ngOnInit(): void {}
}
