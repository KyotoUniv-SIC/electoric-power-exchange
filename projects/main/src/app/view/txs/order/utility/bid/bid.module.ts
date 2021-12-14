import { BidComponent } from './bid.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'projects/main/src/app/material.module';

@NgModule({
  declarations: [BidComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [BidComponent],
})
export class BidModule {}
