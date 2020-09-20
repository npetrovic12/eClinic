import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from 'app/core/user/user.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as formRoot from '../../store/app.reducer';
import * as DepartmentActions from '../store/departments.actions';
@Injectable()
export class DepartmentsEffects {
  loadDepartmentsUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DepartmentActions.tryGetDepartmentData),
      withLatestFrom(this.store$.select(formRoot.getSelectedDepartment)),
      switchMap(([action, selectedDepartment]) => {
        return this.userService.filter({}, { department: selectedDepartment }).pipe(
          map(res => {
            return DepartmentActions.getDepartmentDataSuccess({ userList: res.body });
          }),
          catchError(error => {
            return of(DepartmentActions.getDepartmentDataFailure({ error }));
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private userService: UserService, private store$: Store<formRoot.State>) {}
}
