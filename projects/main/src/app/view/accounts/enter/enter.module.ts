import { MaterialModule } from '../../../material.module';
import { EnterComponent } from './enter.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EnterComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [EnterComponent],
})
export class EnterModule {}
