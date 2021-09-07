import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { TxComponent } from './tx/tx.component';
import { TxsComponent } from './txs.component';

const routes: Routes = [
  { path: '', component: TxsComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sell', component: SellComponent },
  { path: ':tx_hash', component: TxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TxsRoutingModule { }
