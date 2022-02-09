import { AdminModule } from '../../view/admin/admin.module';
import { DashboardModule } from '../../view/admin/dashboard/dashboard.module';
import { XrplModule } from '../../view/admin/xrpl/xrpl.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { XrplComponent } from './xrpl/xrpl.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, XrplComponent],
  imports: [CommonModule, AdminModule, DashboardModule, XrplModule],
})
export class AppAdminModule {}
