import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input()
  message?: Message;
  
  constructor() {}

  ngOnInit(): void {}
}
