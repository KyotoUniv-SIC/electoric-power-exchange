import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ReferenceComponent } from './reference/reference.component';
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
  {
    path: 'rankings',
    component: RankingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
