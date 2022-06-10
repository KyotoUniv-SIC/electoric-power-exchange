import { ReferenceComponent } from '../../view/dashboard/reference/reference.component';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: 'reference',
    component: ReferenceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
