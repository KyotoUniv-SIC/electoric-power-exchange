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
  @Input()
  createdAt?: Date | null;
  @Input()
  createdAtPrimary?: Date | null;

  constructor() {}

  ngOnInit(): void {}
}
