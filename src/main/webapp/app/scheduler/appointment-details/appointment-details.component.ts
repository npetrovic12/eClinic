import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AppointmentModel } from '../appointment.model';
import { AppointmentService } from './appointment.service';

const DateRangeValidatior: ValidatorFn = (fg: FormGroup) => {
  const fromDate = new Date(fg.get('startDate').value);
  const toDate = new Date(fg.get('endDate').value);

  return fromDate !== null && toDate !== null && fromDate <= toDate ? null : { range: true };
};
@Component({
  selector: 'appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {
  private appointment: AppointmentModel;
  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService) {
    this.appointment = new AppointmentModel();
    this.appointmentForm = this.createAppointmentForm();
  }

  ngOnInit() {}

  createAppointmentForm() {
    return this.formBuilder.group(
      {
        subject: [this.appointment.subject ? this.appointment.subject : '', Validators.required],
        startDate: [this.appointment.startDate ? this.appointment.startDate : null, Validators.required],
        endDate: [this.appointment.endDate ? this.appointment.startDate : null, Validators.required],
        description: [this.appointment.description ? this.appointment.description : '']
      },
      { validators: DateRangeValidatior }
    );
  }

  saveAppointment() {
    this.appointment = Object.assign({}, this.appointmentForm.getRawValue());
    this.appointmentService.create(this.appointment).subscribe(res => {});
  }
}
