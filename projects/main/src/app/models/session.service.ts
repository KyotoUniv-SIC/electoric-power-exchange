import { Password, Session, User } from './session.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User as fbUser } from '@firebase/auth-types';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {}
  checkLogin(): void {
    this.afAuth.authState
      .pipe(
        switchMap((auth: fbUser | null) => {
          if (!auth) {
            return of(null);
          } else {
            return this.getUser(auth.uid);
          }
        }),
      )
      .subscribe((user: User | null) => {
        this.session.login = !!user;
        this.session.user = user ? user : new User();
        this.sessionSubject.next(this.session);
      });
  }

  checkLoginState(): Observable<Session> {
    return this.afAuth.authState.pipe(
      map((auth: fbUser | null) => {
        this.session.login = !!auth;
        return this.session;
      }),
    );
  }

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
        this.sessionSubject.next(this.session.reset());
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

  private createUser(user: User): Promise<void> {
    return this.afs.collection('users').doc(user.uid).set(user.deserialize());
  }

  private getUser(uid: string): Observable<any> {
    return this.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((user: any) => {
          if (user) {
            return of(new User(uid, user.name));
          } else {
            return of(null);
          }
        }),
      );
  }

  public getCurrentUser(): Observable<any> {
    return this.afAuth.user;
  }
}
