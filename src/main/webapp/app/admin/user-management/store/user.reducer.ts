import { User } from 'app/core/user/user.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './user.actions';

export const userFeatureKey = 'users';

export interface State {
  selectedUser: User;
  list: User[];
  editMode: boolean;
  count: number;
  page: number;
  searchText: string;
  loadingUsers: boolean;
  loadingUser: boolean;
  savingChanges: boolean;
  restError: any;
}

export const initialState: State = {
  selectedUser: null,
  list: [],
  editMode: false,
  count: 0,
  page: 0,
  searchText: '',
  loadingUsers: false,
  loadingUser: false,
  savingChanges: false,
  restError: null
};

const usersReducer = createReducer(
  initialState,
  on(UsersActions.tryGetUsers, state => ({
    ...state,
    loadingUsers: true
  })),
  on(UsersActions.getUsersSuccess, (state, action) => ({
    ...state,
    loadingUsers: false,
    list: action.users.map(user => {
      const newUser = { ...user };
      newUser.authorities = newUser.authorities.map(role => role.name);
      return newUser;
    }),
    count: action.count
  })),
  on(UsersActions.getUsersError, (state, action) => ({
    ...state,
    loadingUsers: false,
    restError: action.error
  })),
  on(UsersActions.tryDeleteUser, state => ({
    ...state,
    savingChanges: true
  })),
  on(UsersActions.deleteUserSuccess, (state, action) => ({
    ...state,
    savingChanges: false,
    editMode: false,
    selectedUser: null,
    count: state.count - 1,
    list: state.list.filter(user => user.login !== action.login)
  })),
  on(UsersActions.deleteUserError, (state, action) => ({
    ...state,
    savingChanges: false,
    restError: action.error
  })),
  on(UsersActions.tryAddUser, state => ({
    ...state,
    savingChanges: true
  })),
  on(UsersActions.addUserSuccess, (state, action) => ({
    ...state,
    savingChanges: false,
    editMode: true,
    selectedUser: { ...action.user },
    count: state.count + 1,
    list: [{ ...action.user }, ...state.list]
  })),
  on(UsersActions.addUserError, (state, action) => ({
    ...state,
    savingChanges: false,
    restError: action.error
  })),
  on(UsersActions.tryUpdateUser, state => ({ ...state, savingChanges: true })),
  on(UsersActions.updateUserSuccess, (state, action) => ({
    ...state,
    savingChanges: false,
    selectedUser: { ...action.user },
    list: state.list.map(user => {
      if (user.id === action.user.id) return { ...action.user };
      return user;
    })
  })),
  on(UsersActions.updateUserError, (state, action) => ({
    ...state,
    savingChanges: false,
    restError: action.error
  })),
  on(UsersActions.setSelectedUser, (state, action) => ({
    ...state,
    selectedUser: { ...action.user },
    editMode: !!action.user.id
  })),
  on(UsersActions.setSelectedPage, (state, action) => ({
    ...state,
    page: action.pageIndex
  })),
  on(UsersActions.setSearchText, (state, action) => ({
    ...state,
    searchText: action.searchText
  })),
  on(UsersActions.clearSelectedUser, state => ({
    ...state,
    selectedUser: null,
    editMode: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}

export const getSelectedUser = (state: State) => state.selectedUser;
export const getUsersList = (state: State) => state.list;
export const getEditMode = (state: State) => state.editMode;
export const getUsersCount = (state: State) => state.count;
export const getPageIndex = (state: State) => state.page;
export const getSearchText = (state: State) => state.searchText;
export const getLoadingUsers = (state: State) => state.loadingUsers;
export const getLoadingUser = (state: State) => state.loadingUser;
export const getSavingChanges = (state: State) => state.savingChanges;
export const getRestError = (state: State) => state.restError;
