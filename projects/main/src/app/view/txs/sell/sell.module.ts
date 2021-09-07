import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellComponent } from "./sell.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SellComponent],
  imports: [CommonModule, RouterModule],
  exports: [SellComponent]
})
export class SellModule {}
