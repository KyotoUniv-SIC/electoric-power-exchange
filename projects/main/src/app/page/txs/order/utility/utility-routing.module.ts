import { AskComponent } from './ask/ask.component';
import { BidComponent } from './bid/bid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bid/:order_id', component: BidComponent },
  { path: 'ask/:order_id', component: AskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilityRoutingModule {}
