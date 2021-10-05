import { MaterialModule } from '../material.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule],
  exports: [AppComponent],
})
export class ViewModule {}
