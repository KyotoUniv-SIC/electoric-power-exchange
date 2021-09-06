import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TxsComponent } from "./txs.component";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@view/material.module';

@NgModule({
  declarations: [TxsComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  exports: [TxsComponent]
})
export class TxsViewModule {}
