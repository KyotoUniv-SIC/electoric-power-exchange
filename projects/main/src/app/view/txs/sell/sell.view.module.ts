import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellComponent } from "./sell.component";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@view/material.module';

@NgModule({
  declarations: [SellComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  exports: [SellComponent]
})
export class SellViewModule {}
