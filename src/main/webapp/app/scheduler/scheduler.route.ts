import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SchedulerComponent } from './scheduler.component';

export const schedulerRoute: Route = {
  path: 'scheduler',
  component: SchedulerComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'scheduler.title'
  },
  canActivate: [UserRouteAccessService]
};
