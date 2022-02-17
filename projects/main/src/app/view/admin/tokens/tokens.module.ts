import { MaterialModule } from '../../../material.module';
import { TokensComponent } from './tokens.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TokensComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule],
  exports: [TokensComponent],
})
export class TokensModule {}
