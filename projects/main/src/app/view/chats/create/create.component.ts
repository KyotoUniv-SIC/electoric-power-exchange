import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentAccount } from '@local/common';

export type ChatOnSubmitEvent = {
  title: string;
  user1_id: string;
  user1_name: string;
  user2_id: string;
  user2_name: string;
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
    if (!title) {
      alert('タイトルを入力してください');
      return;
    }
    if (!this.user) {
      alert('宛先を指定してください');
      return;
    }
    if (this.user.id == this.studentAccount.id) {
      alert('自分を宛先にはできません');
      return;
    }
    console.log(this.user?.id!);
    this.appSubmit.emit({
      title: title,
      user1_id: this.studentAccount?.id,
      user1_name: this.studentAccount?.name,
      user2_id: this.user.id,
      user2_name: this.user.name,
    });
  }
}
