import { AuthService } from './models/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'main';
  constructor(private auth: AuthService) {
    this.auth.checkLogin();
  }
}
