import {
  Component,
  OnInit,
  Input,
  forwardRef,
  AfterViewInit,
  ViewChild,
  Injector,
  ContentChild,
  ViewChildren,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateTimeModel } from './date-time.model';
import { NgbDatepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { TimePipe } from './time.pipe';

@Component({
  selector: 'date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [
    DatePipe,
    TimePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent), // eslint-disable-line no-use-before-define
      multi: true
    }
  ]
})
export class DateTimeInputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() dateString: string;
  @Input() inputDatetimeFormat = 'M/d/yyyy H:mm:ss';
  @Input() placeholder = 'Date';
  @Input() timeSlots = [];
  @Input() timePlaceHolder = 'Time';

  @Input() disabled = false;

  private showTimePickerToggle = false;
  private datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  private ngControl: NgControl;

  constructor(private inj: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {}

  writeValue(newModel: string) {
    if (newModel) {
      this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //   onInputChange($event: any) {
  //       const value = $event.target.value;
  //       const dt = DateTimeModel.fromLocalString(value);

  //       if (dt) {
  //           this.datetime = dt;
  //           this.setDateStringModel();
  //       } else if (value.trim() === '') {
  //           this.datetime = new DateTimeModel();
  //           this.dateString = '';
  //           this.onChange(this.dateString);
  //       } else {
  //             this.onChange(value);
  //       }
  //   }

  //   onDateChange($event: any) {
  //       console.log($event);
  //       if ($event.year){
  //         $event = `${$event.year}-${$event.month}-${$event.day}`
  //       }

  //       const date = DateTimeModel.fromLocalString($event);

  //       if (!date) {
  //           this.dateString = this.dateString;
  //           return;
  //       }

  //       if (!this.datetime) {
  //           this.datetime = date;
  //       }

  //       this.datetime.year = date.year;
  //       this.datetime.month = date.month;
  //       this.datetime.day = date.day;
  //       // this.dp.navigateTo({ year: this.datetime.year, month: this.datetime.month });
  //       this.setDateStringModel();
  //   }

  onTimeChange(event: NgbTimeStruct) {
    console.log(event);
    // this.datetime.hour = event.hour;
    // this.datetime.minute = event.minute;
    // this.datetime.second = event.second;

    // this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();

    if (!this.firstTimeAssign) {
      this.onChange(this.dateString);
    } else {
      // Skip very first assignment to null done by Angular
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  inputBlur() {
    this.onTouched();
  }
}
