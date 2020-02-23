import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'chipFormat' })
export class ChipFormatPipe implements PipeTransform {
  transform(value: any): string {
    const hour = value.hour.toString().padStart(2, '0');
    const minute = value.minute.toString().padStart(2, '0');
    return hour + ':' + minute;
  }
}
