import { MaterialModule } from '../../../material.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
