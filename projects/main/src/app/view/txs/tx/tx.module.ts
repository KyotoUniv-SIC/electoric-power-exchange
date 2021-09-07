import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TxComponent } from "./tx.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TxComponent],
  imports: [CommonModule, RouterModule],
  exports: [TxComponent]
})
export class TxModule {}
