import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { XrplComponent } from './xrpl/xrpl.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashborad', component: DashboardComponent },
  { path: 'xrpl', component: XrplComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
