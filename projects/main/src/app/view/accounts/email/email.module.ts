import { MaterialModule } from '../../../material.module';
import { EmailComponent } from './email.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EmailComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [EmailComponent],
})
export class EmailModule {}
