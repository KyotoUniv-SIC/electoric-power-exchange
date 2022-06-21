import { MaterialModule } from '../../../material.module';
import { ReferenceComponent } from './reference.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ReferenceComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ReferenceComponent],
})
export class ReferenceModule {}
