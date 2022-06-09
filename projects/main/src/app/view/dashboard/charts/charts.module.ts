import { MaterialModule } from '../../../material.module';
import { ChartsComponent } from './charts.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartsComponent],
  imports: [CommonModule, MaterialModule, ChartsModule],
  exports: [ChartsComponent],
})
export class TimeSeriesChartsModule {}
