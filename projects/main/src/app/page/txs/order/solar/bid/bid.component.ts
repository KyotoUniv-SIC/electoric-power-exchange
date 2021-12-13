import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { RenewableBid } from '@local/common';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bid/renewable-bid.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  renewableBid$: Observable<RenewableBid | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly renewableBidApp: RenewableBidApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.renewableBid$ = orderID$.pipe(mergeMap((orderID) => this.renewableBidApp.get$(accountID, orderID)));
  }

  ngOnInit(): void {}
}
