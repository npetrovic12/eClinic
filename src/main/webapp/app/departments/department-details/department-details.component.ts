import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'app/core/user/user.model';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store/app.reducer';

@Component({
  selector: 'department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentDetailsComponent implements OnInit {
  userList$: Observable<User[]>;
  doctorCount$: Observable<number>;
  nurseCount$: Observable<number>;
  loadingUsers$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.userList$ = this.store.select(fromRoot.getDepartmentsUserList);
    this.doctorCount$ = this.store.select(fromRoot.getDepartmentUsersByRole, { role: 'ROLE_DOCTOR' });
    this.nurseCount$ = this.store.select(fromRoot.getDepartmentUsersByRole, { role: 'ROLE_NURSE' });
    this.loadingUsers$ = this.store.select(fromRoot.getDepartmentsLoading);
  }

  ngOnInit() {}
}
