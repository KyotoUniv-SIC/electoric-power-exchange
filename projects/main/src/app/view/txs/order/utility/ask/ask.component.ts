import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NormalAsk } from '@local/common';

@Component({
  selector: 'view-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  @Input()
  normalAsk?: NormalAsk | null;
  @Input()
  createdAt?: Date | null;

  constructor() {}

  ngOnInit(): void {}
}
