import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat, Message, StudentAccount } from '@local/common';

export type MessageOnSubmitEvent = {
  chatID: string;
  accountID: string;
  text: string;
};

export type DeleteOnSubmitEvent = {
  chatID: string;
};

@Component({
  selector: 'view-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  text: string | undefined;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  chat?: Chat | null;
  @Input()
  messages?: Message[] | null;
  @Output()
  appSubmit: EventEmitter<MessageOnSubmitEvent>;
  @Output()
  appDelete: EventEmitter<DeleteOnSubmitEvent>;

  constructor() {
    this.appSubmit = new EventEmitter();
    this.appDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit(text: string) {
    if (!this.studentAccount) {
      alert('ユーザーログイン情報を取得できません');
      return;
    }
    if (!this.chat) {
      alert('このチャットにメッセージを送信できません');
      return;
    }
    if (!text) {
      alert('メッセージを入力してください');
      return;
    }
    this.appSubmit.emit({
      chatID: this.chat.id,
      accountID: this.studentAccount.id,
      text: text,
    });
  }

  onClickDelete() {
    if (!this.chat) {
      return;
    }
    this.appDelete.emit({ chatID: this.chat.id });
  }
}
