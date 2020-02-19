import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment.model';
import { SchedulerService } from '../scheduler.service';
import { Observable } from 'rxjs';
import { AppointmentStore } from '../appointmentStore.service';

@Component({
  selector: 'appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {
  $appointment: Observable<Appointment>;
  $editMode: Observable<boolean>;
  appointment: Appointment;
  editMode: boolean;

  appointmentForm: FormGroup;
  appointmentSelected = false;

  constructor(private formBuilder: FormBuilder, private appointmentStore: AppointmentStore) {}

  ngOnInit() {
    this.appointmentStore.selectedAppointment.subscribe(res => {
      console.log(res);
      this.appointment = res;
      if (!this.appointment) return;
      this.appointmentForm = this.createAppointmentForm();
    });
    this.$editMode = this.appointmentStore.editMode;
  }

  createAppointmentForm() {
    return this.formBuilder.group({
      subject: [this.appointment.subject ? this.appointment.subject : '', Validators.required],
      appointmentStart: [this.appointment.appointmentStart ? this.appointment.appointmentStart : '', Validators.required],
      appointmentEnd: [this.appointment.appointmentEnd ? this.appointment.appointmentEnd : '', Validators.required],
      description: [this.appointment.description ? this.appointment.description : '']
    });
  }

  saveAppointment() {
    this.appointment = Object.assign({}, this.appointmentForm.getRawValue());
  }
}
