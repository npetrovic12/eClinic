import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';
import { Store } from 'app/shared/store/store';
import { AppointmentService } from './appointment.service';
/* eslint prefer-const: 0 */
@Injectable({
  providedIn: 'root'
})
export class AppointmentStore extends Store<SchedulerState> {
  constructor(private appointmentService: AppointmentService) {
    super(new SchedulerState());
  }

  select(appointment: Appointment) {
    this.setState({
      ...this.state,
      selectedAppointment: appointment,
      editMode: appointment.id ? true : false
    });
  }

  deselect() {
    this.setState({
      ...this.state,
      selectedAppointment: null,
      editMode: false
    });
  }

  fetchAppointments(startDate?: Date, endDate?: Date, searchText?: string) {
    this.appointmentService.filter(startDate, endDate, searchText).subscribe(response => {
      this.setState({
        ...this.state,
        appointmentList: response.data
      });
    });
  }

  addAppointment(appointment: Appointment) {
    const copy = this.convert(appointment);
    this.appointmentService.create(copy).subscribe(result => {
      this.setState({
        ...this.state,
        selectedAppointment: result.data,
        editMode: true,
        appointmentList: [...this.state.appointmentList, result.data]
      });
    });
  }

  updateAppointment(appointment: Appointment) {
    const copy = this.convert(appointment);
    this.appointmentService.update(copy).subscribe(result => {
      this.setState({
        ...this.state,
        selectedAppointment: result.data,
        editMode: true,
        appointmentList: this.state.appointmentList.map((app, index) => {
          if (app.id === appointment.id) return appointment;
          return app;
        })
      });
    });
  }

  deleteAppointment(id: string) {
    this.appointmentService.delete(id).subscribe(() => {
      this.setState({
        ...this.state,
        selectedAppointment: null,
        editMode: false,
        appointmentList: this.state.appointmentList.filter(appointment => id !== appointment.id)
      });
    });
  }

  private convert(appointment: Appointment): Appointment {
    const copy: Appointment = Object.assign({}, appointment);
    return copy;
  }
}

export class SchedulerState {
  selectedAppointment: Appointment = null;
  editMode = false;
  appointmentList: Appointment[] = [];
}
