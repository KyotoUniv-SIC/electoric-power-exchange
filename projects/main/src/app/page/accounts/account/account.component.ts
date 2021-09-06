import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  accountID$: Observable<string>;
  account$: Observable<Account>;

  constructor(private account: AccountService) {
    this.accountID$ = this.route.params.pipe(
      map(params => params['account_id']),
    );
    this.account$ = this.accountID$.pipe(
      mergeMap(id => this.account.get$(id)),
    );
  }

  ngOnInit(): void {}
}
