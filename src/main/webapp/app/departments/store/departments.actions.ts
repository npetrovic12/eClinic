import { createAction, props } from '@ngrx/store';
import { Department } from 'app/core/user/department.enum';
import { User } from 'app/core/user/user.model';

// Set selected department
export const selectDepartment = createAction('[DEPARTMENTS] Set selected department', props<{ department: Department }>());

// Fetch department data
export const tryGetDepartmentData = createAction('[DEPARTMENTS] Try get selected department users');
export const getDepartmentDataSuccess = createAction(
  '[DEPARTMENTS] Get selected department users success',
  props<{ userList: User[]; appointmentCount: number }>()
);
export const getDepartmentDataFailure = createAction('[DEPARTMENTS] Get selected department users failure', props<{ error: any }>());
