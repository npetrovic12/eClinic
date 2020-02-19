import { NgModule } from '@angular/core';
import { EClinicSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { LoginFormComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { GenericAutocompleteComponent } from './generic-autocomplete/generic-autocomplete.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { ChipFormatPipe } from './chip-select/chip-format.pipe';
import { ChipSelectComponent } from './chip-select/chip-select.component';
@NgModule({
  imports: [EClinicSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    LoginFormComponent,
    HasAnyAuthorityDirective,
    GenericAutocompleteComponent,
    GenericModalComponent,
    ChipFormatPipe,
    ChipSelectComponent
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
    GenericModalComponent,
    ChipFormatPipe,
    ChipSelectComponent
  ]
})
export class EClinicSharedModule {}
