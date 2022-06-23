import { MaterialModule } from '../../../material.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { PaymentsComponent } from './payments.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, RouterModule, MaterialModule, PipesModule],
  exports: [PaymentsComponent],
})
export class PaymentsModule {}
