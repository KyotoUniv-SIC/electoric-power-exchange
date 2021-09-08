import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsModule } from '../../view/accounts/accounts.module';
import { AccountModule } from '../../view/accounts/account/account.module';
import { CreateModule } from '../../view/accounts/create/create.module';
import { EnterModule } from '../../view/accounts/enter/enter.module';
import { AccountsComponent } from './accounts.component';
import { AccountComponent } from './account/account.component';
import { CreateComponent } from './create/create.component';
import { EnterComponent } from './enter/enter.component';


@NgModule({
  declarations: [
    AccountComponent,
    AccountsComponent,
    CreateComponent,
    EnterComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    AccountsModule,
    AccountModule,
    CreateModule,
    EnterModule
  ]
})
export class AppAccountsModule { }
