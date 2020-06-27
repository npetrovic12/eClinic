import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as SchedulerActions from './scheduler.actions';
import * as fromRoot from '../../store/app.reducer';
import { Injectable } from '@angular/core';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { AppointmentService } from '../appointment.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class SchedulerEffects {
  // Load filtered  appointments
  loadAppointments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulerActions.tryGetAppointments),
      withLatestFrom(
        this.store$.select(fromRoot.getStartDate),
        this.store$.select(fromRoot.getEndDate),
        this.store$.select(fromRoot.getSelectedDoctor)
      ),
      switchMap(([action, startDate, endDate, selectedDoctor]) =>
        this.appointmentService.filter(startDate, endDate, selectedDoctor.id).pipe(
          map(res => {
            return SchedulerActions.getAppointmentListSuccess({ appointments: res.data, count: res.totalItems });
          }),
          catchError(res => {
            return of(SchedulerActions.getAppointmentListError({ error: res.error }));
          })
        )
      )
    );
  });

  // Add an appointment
  addAppointment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulerActions.tryAddAppointment),
      switchMap(action =>
        this.appointmentService.create(action.appointment).pipe(
          map(res => {
            return SchedulerActions.addAppointmentSuccess({ appointment: res.data });
          }),
          catchError(res => {
            return of(SchedulerActions.addAppointmentError({ error: res.error }));
          })
        )
      )
    );
  });

  // Update an appointment
  updateAppointment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulerActions.tryUpdateAppointment),
      switchMap(action =>
        this.appointmentService.update(action.appointment).pipe(
          map(res => {
            return SchedulerActions.updateAppointmentSuccess({ appointment: res.data });
          }),
          catchError(res => {
            return of(SchedulerActions.updateAppointmentError({ error: res.error }));
          })
        )
      )
    );
  });

  // Delete and appointment
  deleteAppointment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulerActions.tryDeleteAppointment),
      switchMap(action =>
        this.appointmentService.delete(action.appointmentId).pipe(
          map(() => {
            return SchedulerActions.deleteAppointmentSuccess({ appointmentId: action.appointmentId });
          }),
          catchError(res => {
            return of(SchedulerActions.deleteAppointmentError({ error: res.error }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private appointmentService: AppointmentService, private store$: Store<fromRoot.State>) {}
}
