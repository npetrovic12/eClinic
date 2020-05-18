import { Route } from '@angular/router';
import { JobsComponent } from './jobs.component';

export const jobsRoute: Route = {
  path: '',
  component: JobsComponent,
  data: {
    pageTitle: 'global.menu.admin.jobs'
  }
};
