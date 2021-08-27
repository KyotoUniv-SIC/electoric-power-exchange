import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiueoComponent } from './aiueo/aiueo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aiueo', component: AiueoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
