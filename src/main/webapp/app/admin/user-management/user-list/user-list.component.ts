import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../store/app.reducer';
import * as UserActions from '../store/user.actions';
import { Store } from '@ngrx/store';
import { User } from 'app/core/user/user.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  count$: Observable<number>;
  selectedUser$: Observable<User>;
  page$: Observable<number>;
  loadingUserList$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.users$ = this.store.select(fromRoot.getUserList);
    this.count$ = this.store.select(fromRoot.getUserCount);
    this.selectedUser$ = this.store.select(fromRoot.getSelectedUser);
    this.page$ = this.store.select(fromRoot.getUsersListPage);
    this.loadingUserList$ = this.store.select(fromRoot.getLoadingUsers);
  }

  ngOnInit() {
    this.store.dispatch(UserActions.tryGetUsers());
  }

  onUserSelected(user: User) {
    this.store.dispatch(UserActions.setSelectedUser({ user }));
  }

  fetchUsers(pageIndex: number) {
    this.store.dispatch(UserActions.setSelectedPage({ pageIndex }));
    this.store.dispatch(UserActions.tryGetUsers());
  }
}
