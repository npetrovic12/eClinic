import { Route } from '@angular/router';
import { UserManagementComponent } from './user-management.component';

export const userManagementRoute: Route = {
  path: '',
  component: UserManagementComponent,
  data: {
    pageTitle: 'userManagement.home.title'
  }
};
