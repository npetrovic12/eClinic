import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateAdapter extends NgbDateAdapter<Date> {
  fromModel(value: Date): NgbDateStruct {
    return new NgbDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
  }

  toModel(date: NgbDateStruct): Date {
    return new Date(date.year, date.month - 1, date.day);
  }
}
