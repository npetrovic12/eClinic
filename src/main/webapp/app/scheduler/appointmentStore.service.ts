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
      editMode: !!appointment.id
    });
  }

  selectDoctor(doctor: any) {
    this.setState({
      ...this.state,
      selectedDoctor: doctor
    });
  }

  deselect() {
    this.setState({
      ...this.state,
      selectedAppointment: null,
      editMode: false
    });
  }

  fetchAppointments(startDate?: Date, endDate?: Date, doctor?: string, searchText?: string) {
    this.appointmentService.filter(startDate, endDate, doctor, searchText).subscribe(response => {
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

  updateAppointment(updatedAppointment: Appointment) {
    const copy = this.convert(updatedAppointment);
    this.appointmentService.update(copy).subscribe(result => {
      this.setState({
        ...this.state,
        selectedAppointment: result.data,
        editMode: true,
        appointmentList: this.state.appointmentList.map(appointment => {
          if (appointment.id === updatedAppointment.id) return updatedAppointment;
          return appointment;
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
  selectedDoctor: any = null;
  editMode = false;
  appointmentList: Appointment[] = [];
}
