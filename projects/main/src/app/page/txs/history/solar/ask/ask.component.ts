import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { RenewableAskHistory } from '@local/common';
import { RenewableAskHistoryApplicationService } from 'projects/shared/src/lib/services/renewable-ask-histories/renewable-ask-history.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  renewableAsk$: Observable<RenewableAskHistory | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly renewableAskApp: RenewableAskHistoryApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.renewableAsk$ = historyID$.pipe(mergeMap((historyID) => this.renewableAskApp.get$(accountID, historyID)));
  }

  ngOnInit(): void {}
}
