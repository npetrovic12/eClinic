import { Action, createReducer, on } from '@ngrx/store';
import { Department } from 'app/core/user/department.enum';
import { User } from 'app/core/user/user.model';
import * as DepartmentsActions from './departments.actions';

export const departmentsFeatureKey = 'departments';

export interface State {
  selectedDepartment: Department;
  userList: User[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  selectedDepartment: null,
  userList: [],
  loading: false,
  error: null
};

const departmentsReducer = createReducer(
  initialState,
  on(DepartmentsActions.selectDepartment, (state, action) => ({
    ...state,
    selectedDepartment: action.department,
    userList: []
  })),
  on(DepartmentsActions.tryGetDepartmentData, state => ({
    ...state,
    loading: true
  })),
  on(DepartmentsActions.getDepartmentDataSuccess, (state, action) => ({
    ...state,
    loading: false,
    userList: action.userList
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
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
