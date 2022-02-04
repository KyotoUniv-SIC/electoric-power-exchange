import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentAccount } from '@local/common';

export type ChatOnSubmitEvent = {
  title: string;
  user1: string;
  user2: string;
};

@Component({
  selector: 'view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  user: StudentAccount | undefined;
  title: string | undefined;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  studentAccounts?: StudentAccount[] | null;
  @Output()
  appSubmit: EventEmitter<ChatOnSubmitEvent>;

  constructor() {
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit(title: string) {
    if (!this.studentAccount) {
      alert('ユーザーログイン情報を取得できません');
      return;
    }
    if (!this.user) {
      alert('宛先を指定してください');
      return;
    }
    if (this.user?.id == this.studentAccount?.id) {
      alert('自分を宛先にはできません');
      return;
    }
    console.log(this.user?.id!);
    this.appSubmit.emit({ title: title, user1: this.studentAccount?.id, user2: this.user.id });
  }
}
