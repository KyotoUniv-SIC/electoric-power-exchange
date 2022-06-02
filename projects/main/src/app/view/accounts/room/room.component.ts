import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { StudentAccount } from '@local/common';

export interface Select {
  value: string;
  viewValue: string;
}

export type RoomOnSubmitEvent = {
  studentID: string;
  before: string;
  after: string;
};

@Component({
  selector: 'view-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  student?: StudentAccount | null;

  @Output()
  appSubmit: EventEmitter<RoomOnSubmitEvent>;

  constructor() {
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  dormitories: Select[] = [
    { value: 'higashi', viewValue: '東一条館' },
    { value: 'koushi', viewValue: '廣志房' },
    { value: 'sentetsu', viewValue: '船哲房' },
  ];

  onSubmit(building: string, room: string) {
    if (!building) {
      alert('寮を指定してください');
      return;
    }
    if (!this.student) {
      alert('ユーザーログイン情報を取得できません');
      return;
    }
    this.appSubmit.emit({ studentID: this.student?.id, before: this.student.room_id, after: building + room });
  }
}
