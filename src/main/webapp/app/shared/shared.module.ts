import { NgModule } from '@angular/core';
import { EClinicSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { LoginFormComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { GenericAutocompleteComponent } from './generic-autocomplete/generic-autocomplete.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';

@NgModule({
  imports: [EClinicSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    LoginFormComponent,
    HasAnyAuthorityDirective,
    GenericAutocompleteComponent,
    GenericModalComponent
  ],
  entryComponents: [LoginFormComponent],
  exports: [
    EClinicSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    LoginFormComponent,
    HasAnyAuthorityDirective,
    GenericAutocompleteComponent,
    GenericModalComponent
  ]
})
export class EClinicSharedModule {}
