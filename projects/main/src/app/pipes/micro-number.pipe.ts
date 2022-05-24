import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'microNumber',
})
export class MicroNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): unknown {
    if (value === undefined || value === null) {
      return value;
    }
    const micro = Math.floor(value / 10000) / 100;

    return micro.toLocaleString();
  }
}
