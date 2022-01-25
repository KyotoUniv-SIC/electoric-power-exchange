import { MaterialModule } from '../../../material.module';
import { RoomComponent } from './room.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [RoomComponent],
})
export class RoomModule {}
