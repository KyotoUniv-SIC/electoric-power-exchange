import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'projects/shared/src/lib/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.currentUser$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/accounts/enter']);
          alert('ログインしてください');
          return false;
        }
        const auth = getAuth();
        if (!auth.currentUser?.emailVerified) {
          this.router.navigate(['/accounts/account']);
          alert('認証メールを確認してください。');
          return false;
        }
        console.log(user);
        return true;
      }),
    );
  }
}
