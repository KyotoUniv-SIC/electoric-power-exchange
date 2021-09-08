import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TxsRoutingModule } from './txs-routing.module';
import { TxsComponent } from './txs.component';
import { TxComponent } from './tx/tx.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { TxsModule } from '../../view/txs/txs.module';
import { TxModule } from '../../view/txs/tx/tx.module';
import { BuyModule } from '../../view/txs/buy/buy.module';
import { SellModule } from '../../view/txs/sell/sell.module';


@NgModule({
  declarations: [
    TxsComponent,
    TxComponent,
    BuyComponent,
    SellComponent
  ],
  imports: [
    CommonModule,
    TxsRoutingModule,
    TxsModule,
    TxModule,
    BuyModule,
    SellModule
  ]
})
export class AppTxsModule { }
