import { SellComponent } from './sell.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SellComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatButtonModule,MatSelectModule, MatInputModule ],
  exports: [SellComponent],
})
export class SellModule {}
