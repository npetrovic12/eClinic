import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Appointment } from './appointment.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { map, catchError } from 'rxjs/operators';
import { IRestResponse, RestResponse, IRestError } from 'app/core/models/rest.model';
import { RestUtils } from 'app/core/utils/rest-utils';
import { AppointmentCriteria } from './appointment.criteria'; // --> OFF
/* eslint prefer-const: 0 */ @Injectable({
  providedIn: 'root'
})
export class AppointmentStore {
  private resourceUrl = SERVER_API_URL + 'api/appointments';
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
  constructor(private http: HttpClient) {}

  select(appointment: Appointment) {
    this.dataStore.selectedAppointment = appointment;
    this.dataStore.editMode = appointment.id ? true : false;
    this._selectedAppointment.next(Object.assign({}, this.dataStore).selectedAppointment);
    this._editMode.next(Object.assign({}, this.dataStore).editMode);
  }

  deselect() {
    this.dataStore.selectedAppointment = null;
    this.dataStore.editMode = false;
    this._selectedAppointment.next(Object.assign({}, this.dataStore).selectedAppointment);
    this._editMode.next(Object.assign({}, this.dataStore).editMode);
  }

  query(startDate?: Date, endDate?: Date, searchText?: string) {
    const criteria = new AppointmentCriteria(searchText, startDate, endDate);
    return this.http
      .post(this.resourceUrl + '/filter', criteria, { observe: 'response' })
      .pipe(
        map(res => {
          const result: any = res.body;
          let response: IRestResponse = new RestResponse();
          response.totalItems = +res.headers.get('X-Total-Count');
          response.data = result.map(appointment => Object.assign(new Appointment(), appointment));
          return response;
        }),
        catchError(err => {
          console.log('HTTP Error', err);
          let error: IRestError = RestUtils.formRestErrorObject(err);
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.dataStore.appointmentList = response.data;
        this._appointmentList.next(Object.assign({}, this.dataStore).appointmentList);
      });
  }

  create(appointment: Appointment) {
    const copy = this.convert(appointment);
    this.http
      .post(this.resourceUrl, copy)
      .pipe(
        map(res => {
          let response: IRestResponse = new RestResponse();
          response.totalItems = 1;
          response.data = Object.assign(new Appointment(), res);
          return response;
        }),
        catchError(err => {
          const error: IRestError = RestUtils.formRestErrorObject(err);
          return throwError(error);
        })
      )
      .subscribe(result => {
        this.dataStore.selectedAppointment = result.data;
        this.dataStore.editMode = true;
        this.dataStore.appointmentList.push(result.data);
        this._appointmentList.next(Object.assign({}, this.dataStore).appointmentList);
        this._selectedAppointment.next(Object.assign({}, this.dataStore).selectedAppointment);
        this._editMode.next(Object.assign({}, this.dataStore).editMode);
      });
  }

  update(appointment: Appointment) {
    const copy = this.convert(appointment);
    console.log(copy);

    this.http
      .put(this.resourceUrl, copy)
      .pipe(
        map(res => {
          let response: IRestResponse = new RestResponse();
          response.totalItems = 1;
          response.data = Object.assign(new Appointment(), res);
          return response;
        }),
        catchError(err => {
          const error: IRestError = RestUtils.formRestErrorObject(err);
          return throwError(error);
        })
      )
      .subscribe(result => {
        this.dataStore.selectedAppointment = result.data;
        this.dataStore.editMode = true;
        this._selectedAppointment.next(Object.assign({}, this.dataStore).selectedAppointment);
        this._editMode.next(Object.assign({}, this.dataStore).editMode);
      });
  }

  delete(id: string) {
    return this.http
      .delete(`${this.resourceUrl}/${id}`)
      .pipe(
        map(() => {
          let response: IRestResponse = new RestResponse();
          return response;
        }),
        catchError(err => {
          let error: IRestError = RestUtils.formRestErrorObject(err);
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.dataStore.selectedAppointment = null;
        this.dataStore.editMode = false;
        const index = this.dataStore.appointmentList.findIndex(appointment => appointment.id === id);
        this.dataStore.appointmentList.slice(index, 1);
        this._selectedAppointment.next(Object.assign({}, this.dataStore).selectedAppointment);
        this._editMode.next(Object.assign({}, this.dataStore).editMode);
        this._appointmentList.next(Object.assign({}, this.dataStore).appointmentList);
      });
  }

  private convert(appointment: Appointment): Appointment {
    const copy: Appointment = Object.assign({}, appointment);
    return copy;
  }
}
