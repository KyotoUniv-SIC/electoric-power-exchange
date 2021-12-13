import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { AskComponent } from './ask/ask.component';
import { BidComponent } from './bid/bid.component';


@NgModule({
  declarations: [
    AskComponent,
    BidComponent
  ],
  imports: [
    CommonModule,
    UtilityRoutingModule
  ]
})
export class UtilityModule { }
