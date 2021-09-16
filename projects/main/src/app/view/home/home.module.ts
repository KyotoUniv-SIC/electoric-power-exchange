import { MaterialModule } from '../../material.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HomeComponent],
})
export class HomeModule {}
