import { AuthApplicationService } from '../models/auth/auth.application.service';
import { Auth } from '../models/auth/auth.model';
import { AuthService } from '../models/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private router: Router, public authService: AuthService, public authApp: AuthApplicationService) {}

  ngOnInit() {
    this.authService.authState.subscribe((auth: Auth) => {
      if (auth) {
        this.login = auth.login;
      }
    });
  }

  logout(): void {
    this.authApp.logout();
  }
}
