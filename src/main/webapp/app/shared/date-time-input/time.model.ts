import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class TimeModel implements NgbTimeStruct {
  constructor(public hour: number, public minute: number, public second: number) {}

  toString() {
    const hour = this.hour.toString().padStart(2, '0');
    const minute = this.minute.toString().padStart(2, '0');
    return hour + ':' + minute;
  }
}
