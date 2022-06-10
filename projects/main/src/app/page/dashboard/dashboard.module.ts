import { TimeSeriesChartsModule } from '../../view/dashboard/charts/charts.module';
import { DashboardModule } from '../../view/dashboard/dashboard.module';
import { ReferenceModule } from '../../view/dashboard/reference/reference.module';
import { ChartsComponent } from './charts/charts.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReferenceComponent } from './reference/reference.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/shared/src/common';

@NgModule({
  declarations: [DashboardComponent, ChartsComponent, ReferenceComponent],
  imports: [CommonModule, SharedModule, DashboardModule, DashboardRoutingModule, TimeSeriesChartsModule, ReferenceModule],
})
export class AppDashboardModule {}
