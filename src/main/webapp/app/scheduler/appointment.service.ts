import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { AppointmentCriteria } from './appointment.criteria';
import { IRestResponse, RestResponse, IRestError } from 'app/core/models/rest.model';
import { Appointment } from './appointment.model';
import { catchError, map } from 'rxjs/operators';
import { RestUtils } from 'app/core/utils/rest-utils';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private resourceUrl = SERVER_API_URL + 'api/appointments';
  constructor(private http: HttpClient) {}

  filter(startDate?: Date, endDate?: Date, doctor?: string, searchText?: string) {
    const criteria = new AppointmentCriteria(searchText, startDate, endDate, doctor);
    return this.http.post(this.resourceUrl + '/filter', criteria, { observe: 'response' }).pipe(
      map(res => {
        const result: any = res.body;
        const response: IRestResponse = new RestResponse();
        response.totalItems = +res.headers.get('X-Total-Count');
        response.data = result.map(appointment => Object.assign(new Appointment(), appointment));
        return response;
      }),
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  create(appointment: Appointment) {
    return this.http.post<Appointment>(this.resourceUrl, appointment).pipe(
      map(res => {
        const response: IRestResponse = new RestResponse();
        response.totalItems = 1;
        response.data = Object.assign(new Appointment(), res);
        return response;
      }),
      catchError(err => {
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  update(appointment: Appointment) {
    return this.http.put<Appointment>(this.resourceUrl, appointment).pipe(
      map(res => {
        const response: IRestResponse = new RestResponse();
        response.totalItems = 1;
        response.data = Object.assign(new Appointment(), res);
        return response;
      }),
      catchError(err => {
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.resourceUrl}/${id}`).pipe(
      map(() => {
        const response: IRestResponse = new RestResponse();
        return response;
      }),
      catchError(err => {
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }
}
