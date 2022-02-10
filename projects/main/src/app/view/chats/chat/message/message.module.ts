import { MessageComponent } from './message.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'projects/main/src/app/material.module';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [MessageComponent],
})
export class MessageModule {}
