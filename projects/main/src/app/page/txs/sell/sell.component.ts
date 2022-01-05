import { SellOnSubmitEvent } from '../../../view/txs/sell/sell.component';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AvailableBalance, NormalAsk, proto, RenewableAsk } from '@local/common';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { AvailableBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/available-balances/available-balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  balance$: Observable<AvailableBalance> | undefined;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly availableBalanceApp: AvailableBalanceApplicationService,
    private readonly studentAccApp: StudentAccountApplicationService,
  ) {
    this.price = 27;
    this.amount = 1;
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return;
    }
    const accountID$ = this.studentAccApp.getByUid$(uid);
    this.balance$ = accountID$.pipe(mergeMap((account) => this.availableBalanceApp.list$(account.id)));
  }

  ngOnInit(): void {}
  async onSubmit($event: SellOnSubmitEvent) {
    if ($event.denom == 'spx-1') {
      await this.renewableAskApp.create(
        new RenewableAsk({
          type: proto.main.RenewableAskType.SECONDARY,
          account_id: getAuth().currentUser?.uid,
          price: $event.price,
          amount: $event.amount,
        }),
      );
    } else {
      await this.normalAskApp.create(
        new NormalAsk({
          type: proto.main.NormalAskType.SECONDARY,
          account_id: getAuth().currentUser?.uid,
          price: $event.price,
          amount: $event.amount,
        }),
      );
    }
  }
}
