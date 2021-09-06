import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  buyID$: Observable<string>;
  buy$: Observable<Buy>;

  constructor(private buy: BuyService) {
    this.buyID$ = this.route.params.pipe(
      map(params => params['buy_id']),
    );
    this.buy$ = this.buyID$.pipe(
      mergeMap(id => this.buy.get$(id)),
    );
  }

  ngOnInit(): void {}
}
