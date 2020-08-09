import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import './vendor';
import { EClinicSharedModule } from 'app/shared/shared.module';
import { EClinicCoreModule } from 'app/core/core.module';
import { EClinicAppRoutingModule } from './app-routing.module';
import { EClinicHomeModule } from './home/home.module';
import { EClinicEntityModule } from './entities/entity.module';
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SchedulerModule } from './scheduler/scheduler.module';
import { EClinicAppStoreModule } from './store/app.store.module';

@NgModule({
  imports: [
    BrowserModule,
    EClinicSharedModule,
    EClinicCoreModule,
    EClinicHomeModule,
    SchedulerModule,
    EClinicAppStoreModule,
    EClinicEntityModule,
    EClinicAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, ActiveMenuDirective],
  bootstrap: [JhiMainComponent]
})
export class EClinicAppModule {}
