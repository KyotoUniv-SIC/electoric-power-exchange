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
  @Input()
  createdAt?: Date | null;
  @Input()
  askCreatedAt?: Date | null;

  constructor() {}

  ngOnInit(): void {}
}
