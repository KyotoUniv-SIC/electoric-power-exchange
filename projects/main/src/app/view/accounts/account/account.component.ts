import { Component, OnInit, Input } from '@angular/core';
import { proto } from '@local/common';

@Component({
  selector: 'view-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input()
  user?: any | null;

  constructor() {}

  ngOnInit(): void {}
}
