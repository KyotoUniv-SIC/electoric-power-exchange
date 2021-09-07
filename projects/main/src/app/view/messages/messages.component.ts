import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  @Input()
  data?: Messages[];

  constructor() {}

  ngOnInit(): void {}
}
