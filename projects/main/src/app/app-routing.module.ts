import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./page/dashboard/dashboard.module').then((m) => m.AppDashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'accounts',
    loadChildren: () => import('./page/accounts/accounts.module').then((m) => m.AppAccountsModule),
  },
  {
    path: 'txs',
    loadChildren: () => import('./page/txs/txs.module').then((m) => m.AppTxsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'messages',
    loadChildren: () => import('./page/messages/messages.module').then((m) => m.AppMessagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'chats',
    loadChildren: () => import('./page/chats/chats.module').then((m) => m.AppChatsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
