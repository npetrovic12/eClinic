import { Component, OnInit, forwardRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TimeModel } from './time.model';

@Component({
  selector: 'date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent),
      multi: true
    }
  ]
})
export class DateTimeInputComponent implements OnInit, ControlValueAccessor {
  value: Date;
  dateVal: NgbDate;
  timeVal: NgbTimeStruct;
  disabled = false;
  ngControl: NgControl;
  constructor(private inj: Injector) {}

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = new Date(value);
    this.dateVal = new NgbDate(this.value.getFullYear(), this.value.getMonth() + 1, this.value.getDate());
    this.timeVal = new TimeModel(this.value.getHours(), this.value.getMinutes(), this.value.getSeconds());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateSelect(selectedDate: NgbDate) {
    this.dateVal = selectedDate;
    this.value.setDate(this.dateVal.day);
    this.value.setMonth(this.dateVal.month - 1);
    this.value.setFullYear(this.dateVal.year);
    this.onChange(this.value);
  }

  formatDate(date: NgbDate) {
    const delimiter = '/';
    return date.day + delimiter + date.month + delimiter + date.year;
  }

  inputBlur() {
    this.onTouched();
  }

  onDateChange(value: string) {
    this.onChange(value);
  }

  onTimeChange(value: string) {
    const times = value.split(':');
    this.value.setHours(Number(times[0]));
    this.value.setMinutes(Number(times[1]));
    this.onChange(this.value);
  }
}
