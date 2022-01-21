import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalBid, NormalBidDelete } from '@local/common';
import { DeleteOnSubmitEvent } from 'projects/main/src/app/view/txs/order/solar/bid/bid.component';
import { NormalBidDeleteApplicationService } from 'projects/shared/src/lib/services/normal-bid-deletes/normal-bid-delete.application.service';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  normalBid$: Observable<NormalBid | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly normalBidDeleteApp: NormalBidDeleteApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.normalBid$ = combineLatest([studentAccount$, orderID$]).pipe(
      mergeMap(([studentAccount, orderID]) => this.normalBidApp.get$(studentAccount.id, orderID)),
    );
    this.createdAt$ = this.normalBid$.pipe(map((bid) => (bid?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}

  async onSubmit($event: DeleteOnSubmitEvent) {
    await this.normalBidDeleteApp.create(new NormalBidDelete({ bid_id: $event.bidID }));
  }
}
