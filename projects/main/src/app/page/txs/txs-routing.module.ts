import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { TxsComponent } from './txs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TxsComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sell', component: SellComponent },
  {
    path: 'order/solar',
    loadChildren: () => import('./order/solar/solar.module').then((m) => m.AppSolarModule),
  },
  {
    path: 'order/utility',
    loadChildren: () => import('./order/utility/utility.module').then((m) => m.AppUtilityModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TxsRoutingModule {}
