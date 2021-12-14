import { AskComponent } from './ask.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'projects/main/src/app/material.module';

@NgModule({
  declarations: [AskComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [AskComponent],
})
export class AskModule {}
