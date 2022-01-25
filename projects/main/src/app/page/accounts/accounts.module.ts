import { AccountModule } from '../../view/accounts/account/account.module';
import { AccountsModule } from '../../view/accounts/accounts.module';
import { CreateModule } from '../../view/accounts/create/create.module';
import { EnterModule } from '../../view/accounts/enter/enter.module';
import { RoomModule } from '../../view/accounts/room/room.module';
import { AccountComponent } from './account/account.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { CreateComponent } from './create/create.component';
import { EnterComponent } from './enter/enter.component';
import { RoomComponent } from './room/room.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/shared/src/common';

@NgModule({
  declarations: [AccountComponent, AccountsComponent, CreateComponent, EnterComponent, RoomComponent],
  imports: [CommonModule, SharedModule, AccountsRoutingModule, AccountsModule, AccountModule, CreateModule, EnterModule, RoomModule],
})
export class AppAccountsModule {}
