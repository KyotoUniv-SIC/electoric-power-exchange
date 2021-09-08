import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'accounts',
    loadChildren: () => import('./page/accounts/accounts.module').then(m => m.AppAccountsModule)
  },
  {
    path: 'txs',
    loadChildren: () => import('./page/txs/txs.module').then(m => m.AppTxsModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./page/messages/messages.module').then(m => m.AppMessagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
