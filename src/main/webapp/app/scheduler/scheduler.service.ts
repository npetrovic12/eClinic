import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private resourceUrl = SERVER_API_URL + 'api/appointments';
  selectedUser: any;
  selectedAppointment: Appointment;

  constructor(private http: HttpClient) {}

  create(appointmentData: Appointment): Observable<any> {
    return this.http.post(this.resourceUrl, appointmentData, { observe: 'response' });
  }

  getAppointments(criteria: any) {
    return this.http.post(this.resourceUrl, criteria, { observe: 'response' });
  }

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  setSelectedAppointment(selectedAppointment: any) {
    this.selectedAppointment = selectedAppointment;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  deleteAppointment() {}

  updateAppointment() {}

  getAppointment() {}
}
