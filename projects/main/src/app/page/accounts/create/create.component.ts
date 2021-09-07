import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createID$: Observable<string>;
  create$: Observable<Create>;

  constructor(private create: CreateService) {
    this.createID$ = this.route.params.pipe(
      map(params => params['create_id']),
    );
    this.create$ = this.createID$.pipe(
      mergeMap(id => this.create.get$(id)),
    );
  }

  ngOnInit(): void {}
}
