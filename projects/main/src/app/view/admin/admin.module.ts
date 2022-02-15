import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule, MatChipsModule],

  exports: [AdminComponent],
})
export class AdminModule {}
