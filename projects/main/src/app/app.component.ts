import { SessionService } from './models/session.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'main';
  constructor(private session: SessionService) {
    this.session.checkLogin();
  }
}
