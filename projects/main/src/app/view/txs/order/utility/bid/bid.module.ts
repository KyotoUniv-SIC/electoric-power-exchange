import { BidComponent } from './bid.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'projects/main/src/app/material.module';
import { PipesModule } from 'projects/main/src/app/pipes/pipes.module';

@NgModule({
  declarations: [BidComponent],
  imports: [CommonModule, RouterModule, MaterialModule, PipesModule],
  exports: [BidComponent],
})
export class BidModule {}
