import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAskHistory } from '@local/common';

@Component({
  selector: 'view-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  @Input()
  normalAsk?: NormalAskHistory | null;

  createdAt?: Date;

  constructor() {
    this.createdAt = (this.normalAsk?.created_at as Timestamp).toDate();
  }

  ngOnInit(): void {}
}
