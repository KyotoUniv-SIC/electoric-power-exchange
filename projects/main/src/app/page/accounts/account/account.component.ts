import { Component, OnInit } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User | undefined;

  constructor(private route: ActivatedRoute) {
    const auth = getAuth();
    if (auth.currentUser !== null) {
      this.user = auth.currentUser;
    }
  }
  ngOnInit(): void {}
}
