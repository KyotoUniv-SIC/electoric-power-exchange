import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '@local/common';
import { AuthService } from 'projects/shared/src/lib/services/auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private auth: AuthService) {
    this.user$ = auth.currentUser$;
  }
  ngOnInit(): void {}
}
