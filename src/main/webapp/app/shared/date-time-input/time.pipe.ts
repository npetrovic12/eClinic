import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timePipe' })
export class TimePipe implements PipeTransform {
  transform(timeObj: any) {
    return timeObj.hour + ':' + timeObj.minute;
  }
}
