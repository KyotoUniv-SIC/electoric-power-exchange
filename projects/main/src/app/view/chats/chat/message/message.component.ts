import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message, StudentAccount } from '@local/common';

export type DeleteOnSubmitEvent = {
  chatID: string;
  messageID: string;
};

@Component({
  selector: 'view-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  message?: Message | null;
  @Input()
  createdAt?: Date | null;
  @Output()
  appDelete: EventEmitter<DeleteOnSubmitEvent>;

  constructor() {
    this.appDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  onClickDelete() {
    if (!this.message) {
      return;
    }
    if (this.message.account_id != this.studentAccount?.id) {
      alert('自分のMessageのみ削除可能です');
      return;
    }
    this.appDelete.emit({ chatID: this.message.chat_id, messageID: this.message.id });
  }
}
