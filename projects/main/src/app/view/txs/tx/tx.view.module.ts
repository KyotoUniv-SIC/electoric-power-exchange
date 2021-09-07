import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TxComponent } from "./tx.component";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@view/material.module';

@NgModule({
  declarations: [TxComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  exports: [TxComponent]
})
export class TxViewModule {}
