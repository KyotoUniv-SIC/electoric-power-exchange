import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TxsComponent } from "./txs.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TxsComponent],
  imports: [CommonModule, RouterModule],
  exports: [TxsComponent]
})
export class TxsModule {}
