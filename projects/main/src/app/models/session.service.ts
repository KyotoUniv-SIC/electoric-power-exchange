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

  login(account: Password): void {
    this.afAuth
      .signInWithEmailAndPassword(account.email, account.password)
      .then((auth) => {
        if (!auth.user?.emailVerified) {
          this.afAuth.signOut();
          return Promise.reject('Email Address is Unconfirmed.');
        } else {
          this.session.login = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('Login is Successful!'))
      .catch((err) => {
        console.log(err);
        alert('Login is Failure!\n' + err);
      });
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/accounts/enter']);
      })
      .then(() => alert('Logout is Successful!'))
      .catch((err) => {
        console.log(err);
        alert('Logout is Failure!\n' + err);
      });
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
