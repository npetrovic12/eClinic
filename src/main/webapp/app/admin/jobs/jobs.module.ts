import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { jobsRoute } from './jobs.route';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { JobsComponent } from './jobs.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsDetailsComponent } from './jobs-details/jobs-details.component';
import { JobsListItemComponent } from './jobs-list/jobs-list-item/jobs-list-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([jobsRoute]), FlexLayoutModule],
  declarations: [JobsComponent, JobsListComponent, JobsDetailsComponent, JobsListItemComponent]
})
export class JobsModule {}
