import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalBid } from '@local/common';

export type DeleteOnSubmitEvent = {
  bidID: string;
};

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
  @Output()
  appDelete: EventEmitter<DeleteOnSubmitEvent>;

  constructor() {
    this.appDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  onClickDelete() {
    if (!this.normalBid?.id) {
      return;
    }
    this.appDelete.emit({ bidID: this.normalBid?.id });
}
