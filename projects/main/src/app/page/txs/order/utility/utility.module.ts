import { AskModule } from '../../../../view/txs/order/utility/ask/ask.module';
import { BidModule } from '../../../../view/txs/order/utility/bid/bid.module';
import { AskComponent } from './ask/ask.component';
import { BidComponent } from './bid/bid.component';
import { UtilityRoutingModule } from './utility-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AskComponent, BidComponent],
  imports: [CommonModule, UtilityRoutingModule, BidModule, AskModule],
})
export class AppUtilityModule {}
