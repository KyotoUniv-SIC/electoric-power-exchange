import { AdminModule } from '../../view/admin/admin.module';
import { DashboardModule } from '../../view/admin/dashboard/dashboard.module';
import { TokensModule } from '../../view/admin/tokens/tokens.module';
import { XrplModule } from '../../view/admin/xrpl/xrpl.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokensComponent } from './tokens/tokens.component';
import { XrplComponent } from './xrpl/xrpl.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, XrplComponent, TokensComponent],
  imports: [CommonModule, AdminRoutingModule, AdminModule, DashboardModule, XrplModule, TokensModule],
})
export class AppAdminModule {}
