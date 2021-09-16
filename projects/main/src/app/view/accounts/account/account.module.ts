import { MaterialModule } from '../../../material.module';
import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [AccountComponent],
})
export class AccountModule {}
