import { MaterialModule } from '../../material.module';
import { TxsComponent } from './txs.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [TxsComponent],
  imports: [CommonModule, RouterModule, MaterialModule, MatChipsModule,PipesModule],
  exports: [TxsComponent],
})
export class TxsModule {}
