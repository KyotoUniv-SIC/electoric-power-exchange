import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NormalBid } from '@local/common';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  normalBid$: Observable<NormalBid | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly normalBidApp: NormalBidApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.normalBid$ = orderID$.pipe(mergeMap((orderID) => this.normalBidApp.get$(accountID, orderID)));
  }

  ngOnInit(): void {}
}
