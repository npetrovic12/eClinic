import { Route } from '@angular/router';
import { SchedulerComponent } from './scheduler.component';

export const schedulerRoute: Route = {
  path: '',
  component: SchedulerComponent,
  data: {
    pageTitle: 'scheduler.title'
  }
};
