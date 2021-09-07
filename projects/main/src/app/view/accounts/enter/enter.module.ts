import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnterComponent } from "./enter.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EnterComponent],
  imports: [CommonModule, RouterModule],
  exports: [EnterComponent]
})
export class EnterModule {}
