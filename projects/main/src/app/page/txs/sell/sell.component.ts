import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  sellID$: Observable<string>;
  sell$: Observable<Sell>;

  constructor(private sell: SellService) {
    this.sellID$ = this.route.params.pipe(
      map(params => params['sell_id']),
    );
    this.sell$ = this.sellID$.pipe(
      mergeMap(id => this.sell.get$(id)),
    );
  }

  ngOnInit(): void {}
}
