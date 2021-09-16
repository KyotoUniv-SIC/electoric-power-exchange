import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnterComponent } from "./enter.component";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../../../material.module";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [EnterComponent],
  imports: [CommonModule, RouterModule,MaterialModule,MatInputModule],
  exports: [EnterComponent]
})
export class EnterModule {}
