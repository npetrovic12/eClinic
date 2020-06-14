import { createEffect, ofType, Actions } from '@ngrx/effects';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import * as UserActions from './user.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryGetUsers),
      withLatestFrom(this.store$.select(fromRoot.getUsersListPage), this.store$.select(fromRoot.getUsersSearchText)),
      switchMap(([action, page, searchText]) => {
        return this.userService.filter({ page, size: ITEMS_PER_PAGE, sort: ['id', 'desc'] }, searchText).pipe(
          map(res => UserActions.getUsersSuccess({ users: res.body, count: +res.headers.get('X-Total-Count') })),
          catchError(res => of(UserActions.getUsersError({ error: res })))
        );
      })
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryAddUser),
      switchMap(action => {
        return this.userService.create(action.user).pipe(
          map(res => UserActions.addUserSuccess({ user: res })),
          catchError(res => of(UserActions.addUserError({ error: res })))
        );
      })
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryUpdateUser),
      switchMap(action => {
        return this.userService.update(action.user).pipe(
          map(res => UserActions.updateUserSuccess({ user: res })),
          catchError(res => of(UserActions.updateUserError({ error: res })))
        );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.tryDeleteUser),
      switchMap(action => {
        return this.userService.delete(action.login).pipe(
          map(() => UserActions.deleteUserSuccess({ login: action.login })),
          catchError(res => of(UserActions.deleteUserError({ error: res })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private userService: UserService, private store$: Store<fromRoot.State>) {}
}
