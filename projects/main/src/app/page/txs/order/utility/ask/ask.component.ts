import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalAsk, NormalAskDelete } from '@local/common';
import { DeleteOnSubmitEvent } from 'projects/main/src/app/view/txs/order/solar/ask/ask.component';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { NormalAskDeleteApplicationService } from 'projects/shared/src/lib/services/normal-ask-deletes/normal-ask-delete.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  normalAsk$: Observable<NormalAsk | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalAskApp: NormalAskApplicationService,
    private readonly normalAskDeleteApp: NormalAskDeleteApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.normalAsk$ = combineLatest([studentAccount$, orderID$]).pipe(
      mergeMap(([studentAccount, orderID]) => this.normalAskApp.get$(studentAccount.id, orderID)),
    );
    this.createdAt$ = this.normalAsk$.pipe(map((ask) => (ask?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}

  async onSubmit($event: DeleteOnSubmitEvent) {
    await this.normalAskDeleteApp.create(new NormalAskDelete({ ask_id: $event.askID }));
  }
}
