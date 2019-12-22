import { NgModule } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';
import { RouterModule } from '@angular/router';
import { schedulerRoute } from './scheduler.route';
import { DxSchedulerModule, DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [RouterModule.forChild([schedulerRoute]), DxSchedulerModule, DxTemplateModule],
  declarations: [SchedulerComponent]
})
export class SchedulerModule {}
