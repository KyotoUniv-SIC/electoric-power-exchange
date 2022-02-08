import { Component, Input, OnInit } from '@angular/core';
import { Chat, Message, StudentAccount } from '@local/common';

@Component({
  selector: 'view-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  chat?: Chat | null;
  @Input()
  messages?: Message[] | null;

  constructor() {}

  ngOnInit(): void {}
}
