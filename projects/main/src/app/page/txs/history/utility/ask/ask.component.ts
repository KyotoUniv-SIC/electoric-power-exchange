import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalAskHistory } from '@local/common';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  normalAsk$: Observable<NormalAskHistory | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;
  askCreatedAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly normalAskApp: NormalAskHistoryApplicationService,
  ) {
    const user$ = authState(this.auth);
    const studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.normalAsk$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.normalAskApp.get$(studentAccount.id, historyID)),
    );
    this.createdAt$ = this.normalAsk$.pipe(map((ask) => (ask?.created_at as Timestamp).toDate()));
    this.askCreatedAt$ = this.normalAsk$.pipe(map((ask) => (ask?.ask_created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
