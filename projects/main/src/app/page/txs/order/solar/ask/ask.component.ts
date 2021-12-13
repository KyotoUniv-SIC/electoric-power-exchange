import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { RenewableAsk } from '@local/common';
import { RenewableAskApplicationService } from 'projects/shared/src/lib/services/renewable-asks/renewable-ask.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  renewableAsk$: Observable<RenewableAsk | undefined> | undefined;
  constructor(private route: ActivatedRoute, private readonly renewableAskApp: RenewableAskApplicationService) {
    const accountID = getAuth().currentUser?.uid;
    if (!accountID) {
      return;
    }
    const orderID$ = this.route.params.pipe(map((params) => params.order_id));
    this.renewableAsk$ = orderID$.pipe(mergeMap((orderID) => this.renewableAskApp.get$(accountID, orderID)));
  }

  ngOnInit(): void {}
}
