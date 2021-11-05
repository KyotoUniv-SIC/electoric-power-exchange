import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @Input()
  isLogin?: boolean | null;

  @Output()
  appSignOut = new EventEmitter<never>();

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickLogout(): void {}
}
