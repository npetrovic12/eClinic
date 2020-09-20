import { Route } from '@angular/router';
import { DepartmentsComponent } from './departments.component';

export const departmentsRoute: Route = {
  path: '',
  component: DepartmentsComponent,
  data: {
    pageTitle: 'departmentsPage.title'
  }
};
