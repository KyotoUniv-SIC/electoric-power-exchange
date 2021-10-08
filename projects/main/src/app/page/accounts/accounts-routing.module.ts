import { AuthGuard } from '../../guard/auth.guard';
import { EnterGuard } from '../../guard/enter.guard';
import { AccountComponent } from './account/account.component';
import { AccountsComponent } from './accounts.component';
import { CreateComponent } from './create/create.component';
import { EnterComponent } from './enter/enter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'enter', component: EnterComponent, canActivate: [EnterGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
