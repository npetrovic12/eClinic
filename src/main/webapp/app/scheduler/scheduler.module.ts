import { NgModule } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';
import { RouterModule } from '@angular/router';
import { schedulerRoute } from './scheduler.route';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';

@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([schedulerRoute]), FlexLayoutModule, FullCalendarModule],
  declarations: [SchedulerComponent, AppointmentDialogComponent]
})
export class SchedulerModule {}
