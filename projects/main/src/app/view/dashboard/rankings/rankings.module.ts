import { MaterialModule } from '../../../material.module';
import { RankingsComponent } from './rankings.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [RankingsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [RankingsComponent],
})
export class RankingsModule {}
