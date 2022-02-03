import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { StudentAccount } from '@local/common';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
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
  xrpLedger$: Observable<any> | undefined;
  trustLine$: Observable<any> | undefined;

  constructor(private auth: Auth, private route: ActivatedRoute, private readonly studentAccApp: StudentAccountApplicationService) {
    this.user$ = authState(this.auth);
    this.studentAccount$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));

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
    this.xrpLedger$.subscribe((a) => console.log(a));
    this.trustLine$ = this.studentAccount$.pipe(
      mergeMap(async (student) => {
        await client.connect();
        const line = await client.request({
          command: 'account_lines',
          account: student.xrp_address,
          ledger_index: 'validated',
        });
        console.log(line);
        return line;
      }),
    );
    client.disconnect();
  }

  ngOnInit(): void {}
}
