import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
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
  constructor(
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly renewableAskApp: RenewableAskHistoryApplicationService,
  ) {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return;
    }
    const studentAccount$ = this.studentAccApp.getByUid$(uid);
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.renewableAsk$ = combineLatest([studentAccount$, historyID$]).pipe(
      mergeMap(([studentAccount, historyID]) => this.renewableAskApp.get$(studentAccount.id, historyID)),
    );
  }

  ngOnInit(): void {}
}
