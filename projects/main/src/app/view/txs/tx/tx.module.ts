import { MaterialModule } from '../../../material.module';
import { TxComponent } from './tx.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TxComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MatChipsModule],
  exports: [TxComponent],
})
export class TxModule {}
