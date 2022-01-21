import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAsk } from '@local/common';

export type DeleteOnSubmitEvent = {
  askID: string;
};

@Component({
  selector: 'view-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  @Input()
  normalAsk?: NormalAsk | null;
  @Input()
  createdAt?: Date | null;
  @Output()
  appDelete: EventEmitter<DeleteOnSubmitEvent>;

  constructor() {
    this.appDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  onClickDelete() {
    if (!this.normalAsk?.id) {
      return;
    }
    this.appDelete.emit({ askID: this.normalAsk?.id });
  }
}
