import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { RenewableAsk, RenewableAskDelete } from '@local/common';
import { DeleteOnSubmitEvent } from 'projects/main/src/app/view/txs/order/solar/ask/ask.component';
import { RenewableAskDeleteApplicationService } from 'projects/shared/src/lib/services/renewable-ask-deletes/renewable-ask-delete.application.service';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  renewableAsk$: Observable<RenewableAsk | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
    private readonly renewableAskDeleteApp: RenewableAskDeleteApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.renewableAsk$ = combineLatest([studentAccount$, orderID$]).pipe(
      mergeMap(([studentAccount, orderID]) => this.renewableAskApp.get$(studentAccount.id, orderID)),
    );
    this.createdAt$ = this.renewableAsk$.pipe(map((ask) => (ask?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}

  async onSubmit($event: DeleteOnSubmitEvent) {
    await this.renewableAskDeleteApp.create(new RenewableAskDelete({ ask_id: $event.askID }));
  }
}
