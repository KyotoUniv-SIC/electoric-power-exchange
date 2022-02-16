import { Component, OnInit } from '@angular/core';
import { AdminAccount } from '@local/common';
import { AdminAccountApplicationService } from 'projects/shared/src/lib/services/admin-accounts/admin-account.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

declare var xrpl: any;

@Component({
  selector: 'app-xrpl',
  templateUrl: './xrpl.component.html',
  styleUrls: ['./xrpl.component.css'],
})
export class XrplComponent implements OnInit {
  adminAccount$: Observable<AdminAccount> | undefined;
  xrpLedgerHot$: Observable<any> | undefined;
  xrpLedgerCold$: Observable<any> | undefined;
  trustLineHot$: Observable<any> | undefined;
  trustLineCold$: Observable<any> | undefined;

  constructor(private readonly adminAccApp: AdminAccountApplicationService) {
    this.adminAccount$ = this.adminAccApp.getByName$('admin').pipe(map((admins) => admins[0]));

    const TEST_NET = 'wss://s.altnet.rippletest.net:51233';
    const client = new xrpl.Client(TEST_NET);
    this.xrpLedgerHot$ = this.adminAccount$.pipe(
      mergeMap(async (admin) => {
        await client.connect();
        const info = await client.request({
          command: 'account_info',
          account: admin.xrp_address_hot,
          ledger_index: 'validated',
        });
        return info;
      }),
    );

    this.xrpLedgerCold$ = this.adminAccount$.pipe(
      mergeMap(async (admin) => {
        await client.connect();
        const info = await client.request({
          command: 'account_info',
          account: admin.xrp_address_cold,
          ledger_index: 'validated',
        });
        return info;
      }),
    );

    this.trustLineHot$ = this.adminAccount$.pipe(
      mergeMap(async (admin) => {
        await client.connect();
        const line = await client.request({
          command: 'account_lines',
          account: admin.xrp_address_hot,
          ledger_index: 'validated',
        });
        return line;
      }),
    );

    this.trustLineCold$ = this.adminAccount$.pipe(
      mergeMap(async (admin) => {
        await client.connect();
        const line = await client.request({
          command: 'account_lines',
          account: admin.xrp_address_cold,
          ledger_index: 'validated',
        });
        return line;
      }),

      map((trustLineCold) => {
        const linesFiltered = trustLineCold.result.lines.filter((line: { balance: string }) => line.balance != '0');
        return {
          id: trustLineCold.id,
          result: { lines: linesFiltered, validated: trustLineCold.result.validated },
          type: trustLineCold.type,
        };
      }),
    );

    client.disconnect();
  }

  ngOnInit(): void {}
}
