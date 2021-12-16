import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalBidHistory, PrimaryBid } from '@local/common';

@Component({
  selector: 'view-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  @Input()
  normalBid?: NormalBidHistory | null;
  @Input()
  primaryBid?: PrimaryBid | null;

  createdAt?: Date;
  createdAtPrimary?: Date;

  constructor() {
    if (!this.normalBid) {
      return;
    }
    this.createdAt = (this.normalBid.created_at as Timestamp).toDate();
    if (!this.primaryBid) {
      return;
    }
    this.createdAtPrimary = (this.primaryBid.created_at as Timestamp).toDate();
  }

  ngOnInit(): void {}
}
