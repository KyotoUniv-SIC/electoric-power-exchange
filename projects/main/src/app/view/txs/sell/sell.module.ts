import { MaterialModule } from '../../../material.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { SellComponent } from './sell.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [SellComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, PipesModule, ChartsModule],
  exports: [SellComponent],
})
export class SellModule {}
