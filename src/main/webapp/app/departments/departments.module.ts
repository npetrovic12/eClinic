import { NgModule } from '@angular/core';

import { DepartmentsComponent } from './departments.component';
import { RouterModule } from '@angular/router';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { departmentsRoute } from './departments-routing.module';

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [EClinicSharedModule, RouterModule.forChild([departmentsRoute])]
})
export class DepartmentsModule {}
