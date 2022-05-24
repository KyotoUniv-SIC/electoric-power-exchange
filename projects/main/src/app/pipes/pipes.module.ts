import { DecimalsPipe } from './decimals.pipe';
import { FloorPipe } from './floor.pipe';
import { MicroNumberPipe } from './micro-number.pipe';
import { MicroStringPipe } from './micro-string.pipe';
import { UnitConversionPipe } from './unit-conversion.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DecimalsPipe, FloorPipe, UnitConversionPipe, MicroNumberPipe, MicroStringPipe],
  imports: [CommonModule],
  exports: [DecimalsPipe, FloorPipe, UnitConversionPipe, MicroNumberPipe, MicroStringPipe],
})
export class PipesModule {}
