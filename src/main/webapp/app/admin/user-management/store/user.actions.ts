import { createAction, props } from '@ngrx/store';
import { User } from 'app/core/user/user.model';

// Get users
export const tryGetUsers = createAction('[Users] Try get users');
export const getUsersSuccess = createAction('[Users] Get users success', props<{ users: User[]; count: number }>());
export const getUsersError = createAction('[Users] Get users error', props<{ error: any }>());

// Delete user
export const tryDeleteUser = createAction('[Users] Try delete user', props<{ login: string }>());
export const deleteUserSuccess = createAction('[Users] Delete user success', props<{ login: string }>());
export const deleteUserError = createAction('[Users] Delete user error', props<{ error: any }>());

// Add a user
export const tryAddUser = createAction('[Users] Try add user', props<{ user: User }>());
export const addUserSuccess = createAction('[Users] Add user success', props<{ user: User }>());
export const addUserError = createAction('[Users] Add user error', props<{ error: any }>());

// Update a user
export const tryUpdateUser = createAction('[Users] Try update user', props<{ user: User }>());
export const updateUserSuccess = createAction('[Users] Update user success', props<{ user: User }>());
export const updateUserError = createAction('[Users] Update user error', props<{ error: any }>());

// Set selected user
export const setSelectedUser = createAction('[Users] Set selected user', props<{ user: User }>());

// Set selected page
export const setSelectedPage = createAction('[Users] Set selected page', props<{ pageIndex: number }>());

// Set search text
export const setSearchText = createAction('[Users] Set search text', props<{ searchText: string }>());
