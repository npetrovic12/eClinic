import { NgModule } from '@angular/core';

import { DepartmentsComponent } from './departments.component';
import { RouterModule } from '@angular/router';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { departmentsRoute } from './departments-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentStatCardComponent } from './department-details/department-stat-card/department-stat-card.component';
import { DepartmentUserCardComponent } from './department-details/department-user-list/department-user-card/department-user-card.component';
import { DepartmentUserListComponent } from './department-details/department-user-list/department-user-list.component';

@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentListComponent,
    DepartmentDetailsComponent,
    DepartmentStatCardComponent,
    DepartmentUserCardComponent,
    DepartmentUserListComponent
  ],
  imports: [EClinicSharedModule, RouterModule.forChild([departmentsRoute])]
})
export class DepartmentsModule {}
