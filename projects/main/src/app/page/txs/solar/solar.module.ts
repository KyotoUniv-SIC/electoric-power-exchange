import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolarRoutingModule } from './solar-routing.module';
import { BidComponent } from './bid/bid.component';
import { AskComponent } from './ask/ask.component';


@NgModule({
  declarations: [
    BidComponent,
    AskComponent
  ],
  imports: [
    CommonModule,
    SolarRoutingModule
  ]
})
export class SolarModule { }
