import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromRoot from '../../store/app.reducer';
import * as UserAction from './store/user.actions';
import { Store } from '@ngrx/store';
import { User } from 'app/core/user/user.model';
@Component({
  selector: 'user-manager',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  ngOnDestroy() {}

  searchUsers(searchText: string) {
    this.store.dispatch(UserAction.setSearchText({ searchText }));
    this.store.dispatch(UserAction.setSelectedPage({ pageIndex: 0 }));
    this.store.dispatch(UserAction.tryGetUsers());
  }

  onNewUser() {
    const user = new User();
    this.store.dispatch(UserAction.setSelectedUser({ user }));
  }
}
