import { BuyOnSubmitEvent } from '../../../view/txs/buy/buy.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AvailableBalance, NormalBid, RenewableBid, StudentAccount } from '@local/common';
import { NormalBidApplicationService } from 'projects/shared/src/lib/services/normal-bids/normal-bid.application.service';
import { RenewableBidApplicationService } from 'projects/shared/src/lib/services/renewable-bids/renewable-bid.application.service';
import { AvailableBalanceApplicationService } from 'projects/shared/src/lib/services/student-accounts/available-balances/available-balance.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  balance$: Observable<AvailableBalance> | undefined;
  price: number | undefined;
  amount: number | undefined;
  denom: string | undefined;

  constructor(
    private auth: Auth,
    private readonly normalBidApp: NormalBidApplicationService,
    private readonly renewableBidApp: RenewableBidApplicationService,
    private readonly availableBalanceApp: AvailableBalanceApplicationService,
    private readonly studentAccApp: StudentAccountApplicationService,
  ) {
    this.price = 27;
    this.amount = 1;
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.balance$ = this.studentAccount$.pipe(mergeMap((account) => this.availableBalanceApp.list$(account.id)));
  }

  ngOnInit(): void {}

  async onSubmit($event: BuyOnSubmitEvent) {
    if ($event.denom == 'spx-1') {
      await this.renewableBidApp.create(
        new RenewableBid({
          account_id: $event.accountID,
          price: $event.price,
          amount: $event.amount,
          is_deleted: false,
        }),
      );
    } else {
      await this.normalBidApp.create(
        new NormalBid({
          account_id: $event.accountID,
          price: $event.price,
          amount: $event.amount,
          is_deleted: false,
        }),
      );
    }
  }
}
