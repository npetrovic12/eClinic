import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStore {
  private _selectedAppointment = new BehaviorSubject<Appointment>(null);
  private _appointmentList = new BehaviorSubject<Appointment[]>([]);
  private _editMode = new BehaviorSubject<boolean>(false);
  private dataStore: { selectedAppointment: Appointment; editMode: boolean; appointmentList: Appointment[] } = {
    selectedAppointment: null,
    editMode: false,
    appointmentList: []
  };
  readonly selectedAppointment = this._selectedAppointment.asObservable();
  readonly appointmentList = this._appointmentList.asObservable();
  readonly editMode = this._editMode.asObservable();

  select(appointment: Appointment) {
    this.dataStore.selectedAppointment = appointment;
    this.dataStore.editMode = appointment.id ? true : false;
    this._selectedAppointment.next(Object.assign({}, this.dataStore).selectedAppointment);
    this._editMode.next(Object.assign({}, this.dataStore).editMode);
  }
}
