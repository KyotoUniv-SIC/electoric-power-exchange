import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { RenewableAskHistory } from '@local/common';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  renewableAsk$: Observable<RenewableAskHistory | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;
  askCreatedAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly renewableAskApp: RenewableAskHistoryApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.renewableAsk$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.renewableAskApp.get$(studentAccount.id, historyID)),
    );
    this.createdAt$ = this.renewableAsk$.pipe(map((ask) => (ask?.created_at as Timestamp).toDate()));
    this.askCreatedAt$ = this.renewableAsk$.pipe(map((ask) => (ask?.ask_created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
