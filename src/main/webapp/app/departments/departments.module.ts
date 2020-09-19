import { NgModule } from '@angular/core';

import { DepartmentsComponent } from './departments.component';
import { RouterModule } from '@angular/router';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { departmentsRoute } from './departments-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';

@NgModule({
  declarations: [DepartmentsComponent, DepartmentListComponent],
  imports: [EClinicSharedModule, RouterModule.forChild([departmentsRoute])]
})
export class DepartmentsModule {}
