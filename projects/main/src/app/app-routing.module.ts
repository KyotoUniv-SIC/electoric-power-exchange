import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./page/accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'txs',
    loadChildren: () => import('./page/txs/txs.module').then(m => m.TxsModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./page/messages/messages.module').then(m => m.MessagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
