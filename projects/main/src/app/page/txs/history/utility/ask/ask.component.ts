import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NormalAskHistory } from '@local/common';
import { NormalAskHistoryApplicationService } from 'projects/shared/src/lib/services/normal-ask-histories/normal-ask-history.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  normalAsk$: Observable<NormalAskHistory | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly normalAskApp: NormalAskHistoryApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const historyID$ = this.route.params.pipe(map((params) => params.history_id));
    this.normalAsk$ = historyID$.pipe(mergeMap((historyID) => this.normalAskApp.get$(accountID, historyID)));
  }

  ngOnInit(): void {}
}
