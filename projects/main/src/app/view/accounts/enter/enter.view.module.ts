import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnterComponent } from "./enter.component";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@view/material.module';

@NgModule({
  declarations: [EnterComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  exports: [EnterComponent]
})
export class EnterViewModule {}
