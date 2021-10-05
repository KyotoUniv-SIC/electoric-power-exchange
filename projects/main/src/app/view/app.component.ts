import { Session } from '../models/session.model';
import { SessionService } from '../models/session.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'view-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  public login = false;

  constructor(private router: Router, public sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.sessionState.subscribe((session: Session) => {
      if (session) {
        this.login = session.login;
      }
    });
  }

  logout(): void {
    this.sessionService.logout();
  }
}
