import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EClinicSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DxSchedulerModule, DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([HOME_ROUTE]), FlexLayoutModule, DxSchedulerModule, DxTemplateModule],
  declarations: [HomeComponent]
})
export class EClinicHomeModule {}
