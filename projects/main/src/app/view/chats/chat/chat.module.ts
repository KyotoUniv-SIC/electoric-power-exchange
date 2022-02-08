import { MaterialModule } from '../../../material.module';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [ChatComponent],
})
export class ChatModule {}
