import { User } from '../../../models/session.model';
import { SessionService } from '../../../models/session.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { proto } from '@local/common';
import * as Long from 'long';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user$: Observable<any | undefined>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private session: SessionService) {
    this.user$ = session.getCurrentUser();
    this.user$.subscribe((res) => console.log(res));
  }
  ngOnInit(): void {}
}
