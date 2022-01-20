import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { RenewableBid, RenewableBidDelete } from '@local/common';
import { DeleteOnSubmitEvent } from 'projects/main/src/app/view/txs/order/solar/bid/bid.component';
import { RenewableBidDeleteApplicationService } from 'projects/shared/src/lib/services/renewable-bid-deletes/renewable-bid-delete.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  renewableBid$: Observable<RenewableBid | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly renewableBidApp: RenewableBidApplicationService,
    private readonly renewableBidDeleteApp: RenewableBidDeleteApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.renewableBid$ = combineLatest([studentAccount$, orderID$]).pipe(
      mergeMap(([studentAccount, orderID]) => this.renewableBidApp.get$(studentAccount.id, orderID)),
    );
    this.createdAt$ = this.renewableBid$.pipe(map((bid) => (bid?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}

  async onSubmit($event: DeleteOnSubmitEvent) {
    await this.renewableBidDeleteApp.create(new RenewableBidDelete({ bid_id: $event.bidID }));
  }
}
