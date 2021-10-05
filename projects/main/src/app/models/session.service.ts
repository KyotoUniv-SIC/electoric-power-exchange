import { Password, Session } from './session.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  login(): void {
    this.session.login = true;
    this.sessionSubject.next(this.session);
    this.router.navigate(['/']);
  }

  logout(): void {
    this.session.login = false;
    this.sessionSubject.next(this.session);
    this.router.navigate(['/account/enter']);
  }
  signup(account: Password): void {
    this.afAuth
      .createUserWithEmailAndPassword(account.email, account.password)
      .then((auth) => auth.user?.sendEmailVerification())
      .then(() => alert('Confirmation email has been sent'))
      .catch((err) => {
        console.log(err);
        alert('Failed to create an account.\n' + err);
      });
  }
}
