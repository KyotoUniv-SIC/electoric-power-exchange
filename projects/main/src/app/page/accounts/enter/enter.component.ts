import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
  enterID$: Observable<string>;
  enter$: Observable<Enter>;

  constructor(private enter: EnterService) {
    this.enterID$ = this.route.params.pipe(
      map(params => params['enter_id']),
    );
    this.enter$ = this.enterID$.pipe(
      mergeMap(id => this.enter.get$(id)),
    );
  }

  ngOnInit(): void {}
}
