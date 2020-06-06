import { createReducer, on, Action } from '@ngrx/store';

import * as SchedulerActions from './scheduler.actions';
import { Appointment } from '../appointment.model';
import { User } from 'app/core/user/user.model';

export const schedulerFeatureKey = 'scheduler';

export interface State {
  selectedAppointment: Appointment;
  selectedDoctor: User;
  editMode: boolean;
  appointmentList: Appointment[];
  appointmentCount: number;
  loadingAppointments: boolean;
  loadingAppointment: boolean;
  savingAppointment: boolean;
}

export const initialState: State = {
  selectedAppointment: null,
  selectedDoctor: null,
  editMode: false,
  appointmentList: [],
  appointmentCount: 0,
  loadingAppointments: false,
  loadingAppointment: false,
  savingAppointment: false
};

const schedulerReducer = createReducer(
  initialState,
  on(SchedulerActions.setSelectDoctor, (state, action) => ({ ...state, selectedDoctor: action.user })),
  on(SchedulerActions.clearSelectedDoctor, state => ({
    ...state,
    selectedDoctor: null,
    selectedAppointment: null,
    editMode: false,
    appointmentCount: 0,
    appointmentList: []
  })),
  on(SchedulerActions.tryGetAppointments, state => ({ ...state, loadingAppointments: true })),
  on(SchedulerActions.getAppointmentListSuccess, (state, action) => ({
    ...state,
    loadingAppointments: false,
    appointmentList: [...action.appointments],
    appointmentCount: action.count
  })),
  on(SchedulerActions.getAppointmentListError, state => ({ ...state, loadingAppointments: false })),
  on(SchedulerActions.setSelectedAppointment, (state, action) => ({
    ...state,
    selectedAppointment: action.appointment,
    editMode: !!action.appointment.id
  })),
  on(SchedulerActions.clearSelectedAppointment, state => ({
    ...state,
    selectedAppointment: null,
    editMode: false
  })),
  on(SchedulerActions.tryAddAppointment, state => ({ ...state, savingAppointment: true })),
  on(SchedulerActions.addAppointmentSuccess, (state, action) => ({
    ...state,
    savingAppointment: false,
    selectedAppointment: action.appointment,
    editMode: true,
    appointmentCount: state.appointmentCount + 1,
    appointmentList: [...state.appointmentList, action.appointment]
  })),
  on(SchedulerActions.addAppointmentError, state => ({ ...state, savingAppointment: false })),
  on(SchedulerActions.tryUpdateAppointment, state => ({ ...state, savingAppointment: true })),
  on(SchedulerActions.updateAppointmentSuccess, (state, action) => ({
    ...state,
    savingAppointment: false,
    selectedAppointment: action.appointment,
    editMode: true,
    appointmentList: state.appointmentList.map(appointment => {
      if (appointment.id === action.appointment.id) return action.appointment;
      return appointment;
    })
  })),
  on(SchedulerActions.updateAppointmentError, state => ({ ...state, savingAppointment: false })),
  on(SchedulerActions.tryDeleteAppointment, state => ({ ...state, savingAppointment: true })),
  on(SchedulerActions.deleteAppointmentSuccess, (state, action) => ({
    ...state,
    selectedAppointment: null,
    editMode: false,
    savingAppointment: false,
    appointmentList: state.appointmentList.filter(appointment => action.appointmentId !== appointment.id)
    // appointmentCount: state.appointmentCount - 1,
  })),
  on(SchedulerActions.deleteAppointmentError, state => ({ ...state, savingAppointment: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return schedulerReducer(state, action);
}

export const getSelectedAppointment = (state: State) => state.selectedAppointment;
export const getSelectedDoctor = (state: State) => state.selectedDoctor;
export const getEditMode = (state: State) => state.editMode;
export const getAppointmentList = (state: State) => state.appointmentList;
export const getLoadingAppointments = (state: State) => state.loadingAppointments;
export const getLoadingAppointment = (state: State) => state.loadingAppointment;
export const getSavingAppointment = (state: State) => state.savingAppointment;
