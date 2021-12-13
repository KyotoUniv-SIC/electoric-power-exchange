import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalBid } from '@local/common';

@Component({
  selector: 'view-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  @Input()
  normalBid?: NormalBid | null;
  @Input()
  createdAt?: Date | null;

  constructor() {}

  ngOnInit(): void {}
}
