import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { CreateComponent } from './create/create.component';
import { EnterComponent } from './enter/enter.component';

const routes: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'enter', component: EnterComponent},
  { path: ':account_id', component: AccountsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
