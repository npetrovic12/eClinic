import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScheduler from 'app/scheduler/store/scheduler.reducer';
import * as fromUsers from 'app/admin/user-management/store/user.reducer';
import * as fromDepartments from 'app/departments/store/departments.reducer';
export interface State {
  scheduler: fromScheduler.State;
  users: fromUsers.State;
  departments: fromDepartments.State;
}

export const appReducer: ActionReducerMap<State> = {
  scheduler: fromScheduler.reducer,
  users: fromUsers.reducer,
  departments: fromDepartments.reducer
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
export const getStartDate = createSelector(
  getSchedulerState,
  fromScheduler.getStartDate
);
export const getEndDate = createSelector(
  getSchedulerState,
  fromScheduler.getEndDate
);

// Users
export const getUsersState = createFeatureSelector<fromUsers.State>(fromUsers.userFeatureKey);
export const getSelectedUser = createSelector(
  getUsersState,
  fromUsers.getSelectedUser
);
export const getUserList = createSelector(
  getUsersState,
  fromUsers.getUsersList
);
export const getUserEditMode = createSelector(
  getUsersState,
  fromUsers.getEditMode
);
export const getUserCount = createSelector(
  getUsersState,
  fromUsers.getUsersCount
);
export const getUsersListPage = createSelector(
  getUsersState,
  fromUsers.getPageIndex
);
export const getUsersSearchText = createSelector(
  getUsersState,
  fromUsers.getSearchText
);
export const getLoadingUsers = createSelector(
  getUsersState,
  fromUsers.getLoadingUsers
);
export const getLoadingUser = createSelector(
  getUsersState,
  fromUsers.getLoadingUser
);
export const getSavingUserChanges = createSelector(
  getUsersState,
  fromUsers.getSavingChanges
);
export const getUsersRestError = createSelector(
  getUsersState,
  fromUsers.getLoadingUsers
);

export const getDepartmentsState = createFeatureSelector<fromDepartments.State>(fromDepartments.departmentsFeatureKey);
export const getSelectedDepartment = createSelector(
  getDepartmentsState,
  fromDepartments.getSelectedDepartment
);
export const getDepartmentsUserList = createSelector(
  getDepartmentsState,
  fromDepartments.getUserList
);
export const getDepartmentsUserCount = createSelector(
  getDepartmentsState,
  fromDepartments.getUserCount
);
export const getDepartmentsAppointmentCount = createSelector(
  getDepartmentsState,
  fromDepartments.getAppointmentCount
);
export const getDepartmentsLoading = createSelector(
  getDepartmentsState,
  fromDepartments.getLoading
);
export const getDepartmentsError = createSelector(
  getDepartmentsState,
  fromDepartments.getError
);
