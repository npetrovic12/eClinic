import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/core/user/user.model';
import * as fromRoot from '../../../store/app.reducer';
import * as SchedulerActions from '../../../scheduler/store/scheduler.actions';
@Component({
  selector: 'department-user-list',
  templateUrl: './department-user-list.component.html',
  styleUrls: ['./department-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentUserListComponent {
  @Input() users: User[];
  @Input() loading: boolean;

  constructor(private store: Store<fromRoot.State>) {}

  trackByUserId(index: number, user: User) {
    return user.id;
  }

  onNewAppointmentSelected(user: User) {
    this.store.dispatch(SchedulerActions.setSelectedDoctor({ user }));
  }
}
