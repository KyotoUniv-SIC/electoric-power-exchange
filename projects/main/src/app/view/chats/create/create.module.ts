import { MaterialModule } from '../../../material.module';
import { CreateComponent } from './create.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, MatRadioModule],
  exports: [CreateComponent],
})
export class CreateModule {}
