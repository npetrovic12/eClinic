import { NgModule } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';
import { RouterModule } from '@angular/router';
import { schedulerRoute } from './scheduler.route';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([schedulerRoute]), FullCalendarModule],
  declarations: [SchedulerComponent, AppointmentDetailsComponent]
})
export class SchedulerModule {}
