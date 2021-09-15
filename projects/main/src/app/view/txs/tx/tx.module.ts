import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TxComponent } from "./tx.component";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../../../material.module";
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [TxComponent],
  imports: [CommonModule, RouterModule,MaterialModule,MatChipsModule],
  exports: [TxComponent]
})
export class TxModule {}
