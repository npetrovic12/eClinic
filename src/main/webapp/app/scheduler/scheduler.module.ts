import { NgModule } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';
import { RouterModule } from '@angular/router';
import { schedulerRoute } from './scheduler.route';
import { DxSchedulerModule, DxTemplateModule } from 'devextreme-angular';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([schedulerRoute]), FlexLayoutModule, DxSchedulerModule, DxTemplateModule],
  declarations: [SchedulerComponent]
})
export class SchedulerModule {}
