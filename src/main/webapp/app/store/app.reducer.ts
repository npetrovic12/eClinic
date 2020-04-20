import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScheduler from 'app/scheduler/store/scheduler.reducer';

export interface State {
  scheduler: fromScheduler.State;
}

export const appReducer: ActionReducerMap<State> = {
  scheduler: fromScheduler.reducer
};

export const getSchedulerState = createFeatureSelector<fromScheduler.State>(fromScheduler.schedulerFeatureKey);
export const getSelectedAppointment = createSelector(
  getSchedulerState,
  fromScheduler.getSelectedAppointment
);
export const getSelectedDoctor = createSelector(
  getSchedulerState,
  fromScheduler.getSelectedDoctor
);
export const getEditMode = createSelector(
  getSchedulerState,
  fromScheduler.getEditMode
);
export const getAppointmentList = createSelector(
  getSchedulerState,
  fromScheduler.getAppointmentList
);
export const getLoadingAppointments = createSelector(
  getSchedulerState,
  fromScheduler.getLoadingAppointments
);
export const getLoadingAppointment = createSelector(
  getSchedulerState,
  fromScheduler.getLoadingAppointment
);
export const getSavingAppointment = createSelector(
  getSchedulerState,
  fromScheduler.getSavingAppointment
);
