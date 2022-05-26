import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'microString',
})
export class MicroStringPipe implements PipeTransform {
  transform(value: string | null | undefined): unknown {
    if (value === undefined || value === null) {
      return value;
    }
    const num = parseInt(value);
    const micro = Math.floor(num / 10000) / 100;

    return micro.toLocaleString();
  }
}
