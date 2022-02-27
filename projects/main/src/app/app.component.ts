import { Component } from '@angular/core';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';
import { AuthService } from 'projects/shared/src/lib/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLogin$: Observable<boolean>;
  constructor(private readonly auth: AuthService, private authApp: AuthApplicationService) {
    this.isLogin$ = this.auth.currentUser$.pipe(map((user) => !!user?.id));
  }

  async onSubmit() {
    this.authApp.signOut();
  }
}
