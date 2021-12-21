import { MaterialModule } from '../../material.module';
import { ChatsComponent } from './chats.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChatsComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [ChatsComponent],
})
export class ChatsModule {}
