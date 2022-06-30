import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AdminAccountApplicationService } from 'projects/shared/src/lib/services/admin-accounts/admin-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private readonly adminApp: AdminAccountApplicationService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.adminApp.getByName$('admin').pipe(
      mergeMap(async (admin) => {
        while (true) {
          const password = await this.adminApp.openAdminAuthDialog();
          if (password == admin[0].password) {
            return true;
          } else {
            alert('Invalid Password');
          }
        }
      }),
    );
  }
}
