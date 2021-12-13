import { Component, Input, OnInit } from '@angular/core';
import { RenewableBid } from '@local/common';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'view-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit {
  @Input()
  renewableBid?: RenewableBid | null;
  @Input()
  createdAt?: Date | null;

  constructor() {}

  ngOnInit(): void {}
}
