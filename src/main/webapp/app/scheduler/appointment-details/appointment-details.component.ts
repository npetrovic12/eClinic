import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment.model';
import { Observable } from 'rxjs';
import { AppointmentStore } from '../appointmentStore.service';
/* eslint prefer-const: 0 */
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
      this.appointment = res;
      if (!this.appointment) return;
      this.appointmentForm = this.createAppointmentForm();
    });
    this.$editMode = this.appointmentStore.editMode;
  }

  createAppointmentForm() {
    return this.formBuilder.group({
      title: [this.appointment.title ? this.appointment.title : '', Validators.required],
      start: [this.appointment.start ? this.appointment.start : '', Validators.required],
      end: [this.appointment.end ? this.appointment.end : '', Validators.required],
      description: [this.appointment.description ? this.appointment.description : '']
    });
  }

  saveAppointment() {
    this.appointment = Object.assign(this.appointment, this.appointmentForm.getRawValue());
    if (this.appointment.id) {
      this.appointmentStore.update(this.appointment);
    } else {
      this.appointmentStore.create(this.appointment);
    }
  }

  deleteAppointment() {
    this.appointmentStore.delete(this.appointment.id);
  }
}
