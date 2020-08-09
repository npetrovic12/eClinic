import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SchedulerEffects } from 'app/scheduler/store/scheduler.effects';
import { UserEffects } from 'app/admin/user-management/store/user.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([SchedulerEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 15
    })
  ]
})
export class EClinicAppStoreModule {}
