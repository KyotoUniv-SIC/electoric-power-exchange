import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Balance, StudentAccount } from '@local/common';
import { BalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/balances/balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

declare var xrpl: any;

@Component({
  selector: 'app-xrpl',
  templateUrl: './xrpl.component.html',
  styleUrls: ['./xrpl.component.css'],
})
export class XrplComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  studentAccount$: Observable<StudentAccount> | undefined;
  balances$: Observable<Balance | null> | undefined;
  xrpLedger$: Observable<any> | undefined;
  trustLine$: Observable<any> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly balanceApp: BalanceApplicationService,
  ) {
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.balances$ = this.studentAccount$.pipe(mergeMap((account) => (!account ? of(null) : this.balanceApp.getLatest$(account.id))));

    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    this.xrpLedger$ = this.studentAccount$.pipe(
      mergeMap(async (student) => {
        await client.connect();
        const info = await client.request({
          command: 'account_info',
          account: student.xrp_address,
          ledger_index: 'validated',
        });
        return info;
      }),
    );
    this.trustLine$ = this.studentAccount$.pipe(
      mergeMap(async (student) => {
        await client.connect();
        const line = await client.request({
          command: 'account_lines',
          account: student.xrp_address,
          ledger_index: 'validated',
        });
        return line;
      }),
    );
    client.disconnect();
  }

  ngOnInit(): void {}
}
