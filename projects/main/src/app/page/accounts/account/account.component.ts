import { AuthApplicationService } from '../../../models/auth/auth.application.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user$: Observable<any | undefined>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private authApp: AuthApplicationService) {
    this.user$ = authApp.getCurrentUser();
    this.user$.subscribe((res) => console.log(res));
  }
  ngOnInit(): void {}
}
