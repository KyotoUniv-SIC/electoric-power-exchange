import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { TxsComponent } from './txs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TxsComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sell', component: SellComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TxsRoutingModule {}
