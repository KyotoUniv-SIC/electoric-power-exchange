import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuyComponent } from "./buy.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BuyComponent],
  imports: [CommonModule, RouterModule],
  exports: [BuyComponent]
})
export class BuyModule {}
