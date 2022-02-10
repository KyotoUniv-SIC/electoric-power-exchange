import { Component, Input, OnInit } from '@angular/core';
import { Chat, StudentAccount } from '@local/common';

@Component({
  selector: 'view-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  chats?: Chat[] | null;

  constructor() {}

  ngOnInit(): void {}
}
