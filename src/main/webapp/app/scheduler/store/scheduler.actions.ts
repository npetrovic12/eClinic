import { createAction, props } from '@ngrx/store';
import { Appointment } from '../model/appointment.model';
import { User } from 'app/core/user/user.model';

// Change selected doctor
export const setSelectedDoctor = createAction('[Scheduler] Select a doctor', props<{ user: User }>());
export const clearSelectedDoctor = createAction('[Scheduler] Clear selected doctor');

// Load appointments
export const tryGetAppointments = createAction('[Scheduler] Try get appointment list');
export const getAppointmentListSuccess = createAction(
  '[Scheduler] Get appointment list success',
  props<{ appointments: Appointment[]; count: number }>()
);
export const getAppointmentListError = createAction('[Scheduler] Get appointment list error', props<{ error: any }>());

// Change selected appointment
export const setSelectedAppointment = createAction('[Scheduler] Select appointment', props<{ appointment: Appointment }>());
export const clearSelectedAppointment = createAction('[Scheduler] Clear selected appointment');

// Add appointment
export const tryAddAppointment = createAction('[Scheduler] Try add appointment', props<{ appointment: Appointment }>());
export const addAppointmentSuccess = createAction('[Scheduler] Add appointment success', props<{ appointment: Appointment }>());
export const addAppointmentError = createAction('[Scheduler] Add appointment failure', props<{ error: any }>());

// Update appointment
export const tryUpdateAppointment = createAction('[Scheduler] Try update appointment', props<{ appointment: Appointment }>());
export const updateAppointmentSuccess = createAction('[Scheduler] Update appointment success', props<{ appointment: Appointment }>());
export const updateAppointmentError = createAction('[Scheduler] Update appointment failure', props<{ error: any }>());

// Delete appointment
export const tryDeleteAppointment = createAction('[Scheduler] Try delete appointment', props<{ appointmentId: string }>());
export const deleteAppointmentSuccess = createAction('[Scheduler] Delete appointment success', props<{ appointmentId: string }>());
export const deleteAppointmentError = createAction('[Scheduler] Delete appointment failure', props<{ error: any }>());

// Set date range
export const setStartDate = createAction('[Scheduler] Set start date', props<{ startDate: Date }>());
export const setEndDate = createAction('[Scheduler] Set end date', props<{ endDate: Date }>());
