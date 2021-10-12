import { Password, Auth } from './auth.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApplicationService {
  public auth = new Auth();
  public authSubject = new Subject<Auth>();
  public authState = this.authSubject.asObservable();

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  login(account: Password): void {
    this.afAuth
      .signInWithEmailAndPassword(account.email, account.password)
      .then((auth) => {
        if (!auth.user?.emailVerified) {
          this.afAuth.signOut();
          return Promise.reject('Email Address is Unconfirmed.');
        } else {
          this.auth.login = true;
          this.authSubject.next(this.auth);
          return this.router.navigate(['/dashboard']);
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
        return this.router.navigate(['/accounts/enter']);
      })
      .then(() => {
        this.authSubject.next(this.auth.reset());
        alert('Logout is Successful!');
      })
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

  public getCurrentUser(): Observable<any> {
    return this.afAuth.user;
  }
}
