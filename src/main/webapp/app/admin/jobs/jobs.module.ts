import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { jobsRoute } from './jobs.route';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { JobsComponent } from './jobs.component';

@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([jobsRoute])],
  declarations: [JobsComponent]
})
export class JobsModule {}
