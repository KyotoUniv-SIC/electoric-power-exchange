import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { StudentAccount } from '@local/common';

@Component({
  selector: 'view-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  student?: StudentAccount | null;

  @Output()
  appSubmit: EventEmitter<string>;

  constructor() {
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit(email: string) {
    if (!email) {
      alert('メールアドレスを正しく入力してください');
      return;
    }
    this.appSubmit.emit(email);
  }
}
