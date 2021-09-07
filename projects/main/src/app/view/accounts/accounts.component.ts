import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  @Input()
  data?: Accounts[];

  constructor() {}

  ngOnInit(): void {}
}
