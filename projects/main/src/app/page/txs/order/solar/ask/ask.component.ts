import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { RenewableAsk } from '@local/common';
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
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly renewableAskApp: RenewableAskApplicationService,
  ) {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return;
    }
    const studentAccount$ = this.studentAccApp.getByUid$(uid);
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.renewableAsk$ = combineLatest([studentAccount$, orderID$]).pipe(
      mergeMap(([studentAccount, orderID]) => this.renewableAskApp.get$(studentAccount.id, orderID)),
    );
    this.createdAt$ = this.renewableAsk$.pipe(map((bid) => (bid?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
