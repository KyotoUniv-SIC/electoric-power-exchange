import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalBidHistory } from '@local/common';

@Component({
  selector: 'view-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  @Input()
  normalBid?: NormalBidHistory | null;

  createdAt?: Date;

  constructor() {
    this.createdAt = (this.normalBid?.created_at as Timestamp).toDate();
  }

  ngOnInit(): void {}
}
