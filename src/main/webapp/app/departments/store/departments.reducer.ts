import { Action, createReducer, on } from '@ngrx/store';
import { Department } from 'app/core/user/department.enum';
import { User } from 'app/core/user/user.model';
import * as DepartmentsActions from './departments.actions';

export const departmentsFeatureKey = 'departments';

export interface State {
  selectedDepartment: Department;
  userList: User[];
  userCount: number;
  appointmentCount: number;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  selectedDepartment: null,
  userList: [],
  userCount: 0,
  appointmentCount: 0,
  loading: false,
  error: null
};

const departmentsReducer = createReducer(
  initialState,
  on(DepartmentsActions.selectDepartment, (state, action) => ({
    ...state,
    selectedDepartment: action.department
  })),
  on(DepartmentsActions.tryGetDepartmentData, state => ({
    ...state,
    loading: true
  })),
  on(DepartmentsActions.getDepartmentDataSuccess, (state, action) => ({
    ...state,
    loading: false,
    userList: action.userList,
    appointmentCount: action.appointmentCount
  })),
  on(DepartmentsActions.getDepartmentDataFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return departmentsReducer(state, action);
}

export const getSelectedDepartment = (state: State) => state.selectedDepartment;
export const getUserList = (state: State) => state.userList;
export const getUserCount = (state: State) => state.userCount;
export const getAppointmentCount = (state: State) => state.appointmentCount;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
