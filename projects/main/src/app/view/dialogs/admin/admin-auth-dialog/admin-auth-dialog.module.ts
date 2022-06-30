import { AdminAuthDialogComponent } from './admin-auth-dialog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/main/src/app/material.module';

@NgModule({
  declarations: [AdminAuthDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class AppAdminAuthDialogModule {}
