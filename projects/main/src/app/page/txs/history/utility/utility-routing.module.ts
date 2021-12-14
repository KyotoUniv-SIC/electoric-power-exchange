import { AskComponent } from './ask/ask.component';
import { BidComponent } from './bid/bid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bid/:history_id', component: BidComponent },
  { path: 'ask/:history_id', component: AskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilityRoutingModule {}
