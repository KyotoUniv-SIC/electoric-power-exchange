import { MaterialModule } from '../../material.module';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule, MatChipsModule],

  exports: [AdminComponent],
})
export class AdminModule {}
