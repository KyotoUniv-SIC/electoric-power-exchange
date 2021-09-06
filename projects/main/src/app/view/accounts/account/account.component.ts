import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input()
  account?: Account;
  
  constructor() {}

  ngOnInit(): void {}
}
