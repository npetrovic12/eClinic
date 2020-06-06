import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScheduler from 'app/scheduler/store/scheduler.reducer';
import * as fromJobs from 'app/admin/jobs/store/jobs.reducer';
export interface State {
  scheduler: fromScheduler.State;
  jobs: fromJobs.State;
}

export const appReducer: ActionReducerMap<State> = {
  scheduler: fromScheduler.reducer,
  jobs: fromJobs.reducer
};

// Scheduler
export const getSchedulerState = createFeatureSelector<fromScheduler.State>(fromScheduler.schedulerFeatureKey);
export const getSelectedAppointment = createSelector(
  getSchedulerState,
  fromScheduler.getSelectedAppointment
);
export const getSelectedDoctor = createSelector(
  getSchedulerState,
  fromScheduler.getSelectedDoctor
);
export const getAppointmentEditMode = createSelector(
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

// Jobs
export const getJobsState = createFeatureSelector<fromJobs.State>(fromJobs.jobsFeatureKey);
export const getSelectedJob = createSelector(
  getJobsState,
  fromJobs.getSelectedJob
);
export const getJobsList = createSelector(
  getJobsState,
  fromJobs.getJobsList
);
export const getJobEditMode = createSelector(
  getJobsState,
  fromJobs.getEditMode
);
export const getJobsCount = createSelector(
  getJobsState,
  fromJobs.getCount
);
export const getLoadingJobs = createSelector(
  getJobsState,
  fromJobs.getLoadingJobs
);
export const getLoadingJob = createSelector(
  getJobsState,
  fromJobs.getLoadingJob
);
export const getSavingJobChanges = createSelector(
  getJobsState,
  fromJobs.getSavingChanges
);
export const getJobRestError = createSelector(
  getJobsState,
  fromJobs.getRestError
);
export const getJobsListPage = createSelector(
  getJobsState,
  fromJobs.getPageIndex
);
export const getJobsSearchText = createSelector(
  getJobsState,
  fromJobs.getSearchText
);
