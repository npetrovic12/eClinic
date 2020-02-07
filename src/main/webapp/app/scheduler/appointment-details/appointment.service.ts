import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { AppointmentModel } from '../appointment.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private resourceUrl = SERVER_API_URL + 'api/appointments';

  constructor(private http: HttpClient) {}

  create(appointmentData: AppointmentModel): Observable<any> {
    return this.http.post(this.resourceUrl, appointmentData, { observe: 'response' });
  }

  deleteAppointment() {}

  updateAppointment() {}

  getAppointment() {}
}
