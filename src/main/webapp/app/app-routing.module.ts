import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      navbarRoute,
      {
        path: '',
        redirectTo: 'scheduler',
        pathMatch: 'full'
      },
      {
        path: 'admin',
        data: {
          authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.EClinicAccountModule)
      },
      {
        path: 'scheduler',
        data: {
          authorities: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE', 'ROLE_PATIENT']
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule)
      },
      {
        path: 'departments',
        data: {
          authorities: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE', 'ROLE_PATIENT']
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule)
      },
      ...errorRoute
    ])
  ],
  exports: [RouterModule]
})
export class EClinicAppRoutingModule {}
