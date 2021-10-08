import { DashboardModule } from '../../view/dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/shared/src/common';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, DashboardModule, DashboardRoutingModule],
})
export class AppDashboardModule {}
