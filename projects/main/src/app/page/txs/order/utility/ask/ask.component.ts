import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NormalAsk } from '@local/common';
import { NormalAskApplicationService } from 'projects/shared/src/lib/services/normal-asks/normal-ask.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  normalAsk$: Observable<NormalAsk | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(private route: ActivatedRoute, private readonly normalAskApp: NormalAskApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.normalAsk$ = orderID$.pipe(mergeMap((orderID) => this.normalAskApp.get$(accountID, orderID)));
    this.createdAt$ = this.normalAsk$.pipe(map((bid) => (bid?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}
}
