import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../store/app.reducer';
import * as SchedulerActions from '../store/scheduler.actions';
import { Appointment } from '../model/appointment.model';
/* eslint prefer-const: 0 */
@Component({
  selector: 'appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit, OnDestroy {
  appointment$: Observable<Appointment>;
  editMode$: Observable<boolean>;

  onAppointmentChange: Subscription;

  appointment: Appointment;
  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<fromRoot.State>) {
    this.appointment$ = this.store.select(fromRoot.getSelectedAppointment);
    this.editMode$ = this.store.select(fromRoot.getAppointmentEditMode);
  }

  ngOnDestroy(): void {
    this.onAppointmentChange.unsubscribe();
  }

  ngOnInit() {
    this.onAppointmentChange = this.appointment$.subscribe(selectedAppointment => {
      this.appointment = selectedAppointment ? { ...selectedAppointment } : null;
      if (!this.appointment) return;
      this.appointmentForm = this.createAppointmentForm();
    });
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
    Object.assign(this.appointment, this.appointmentForm.getRawValue());
    if (this.appointment.id) {
      this.store.dispatch(SchedulerActions.tryUpdateAppointment({ appointment: this.appointment }));
    } else {
      this.store.dispatch(SchedulerActions.tryAddAppointment({ appointment: this.appointment }));
    }
  }

  deleteAppointment() {
    this.store.dispatch(SchedulerActions.tryDeleteAppointment({ appointmentId: this.appointment.id }));
  }
}
