import { Auth, User } from './auth.model';
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
export class AuthService {
  public auth = new Auth();
  public authSubject = new Subject<Auth>();
  public authState = this.authSubject.asObservable();

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
        this.auth.login = !!user;
        this.auth.user = user ? user : new User();
        this.authSubject.next(this.auth);
      });
  }

  checkLoginState(): Observable<Auth> {
    return this.afAuth.authState.pipe(
      map((auth: fbUser | null) => {
        this.auth.login = !!auth;
        return this.auth;
      }),
    );
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
}
