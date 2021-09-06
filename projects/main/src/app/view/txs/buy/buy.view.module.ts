import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuyComponent } from "./buy.component";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@view/material.module';

@NgModule({
  declarations: [BuyComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  exports: [BuyComponent]
})
export class BuyViewModule {}
