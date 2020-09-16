import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SchedulerComponent } from './scheduler.component';

export const schedulerRoute: Route = {
  path: '',
  component: SchedulerComponent,
  data: {
    pageTitle: 'scheduler.title'
  }
};
