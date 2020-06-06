import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SchedulerEffects } from 'app/scheduler/store/scheduler.effects';
import { JobsEffects } from 'app/admin/jobs/store/jobs.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([SchedulerEffects, JobsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 15
    })
  ]
})
export class EClinicAppStoreModule {}
