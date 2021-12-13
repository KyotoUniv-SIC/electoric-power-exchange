import { AskModule } from '../../../../view/txs/history/solar/ask/ask.module';
import { BidModule } from '../../../../view/txs/history/solar/bid/bid.module';
import { AskComponent } from './ask/ask.component';
import { BidComponent } from './bid/bid.component';
import { SolarRoutingModule } from './solar-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [BidComponent, AskComponent],
  imports: [CommonModule, SolarRoutingModule, BidModule, AskModule],
})
export class AppSolarModule {}
