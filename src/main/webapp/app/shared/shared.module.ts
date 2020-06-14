import { NgModule } from '@angular/core';
import { EClinicSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { LoginFormComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { GenericAutocompleteComponent } from './generic-autocomplete/generic-autocomplete.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { DateTimeInputComponent } from './date-time-input/date-time-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemListComponent } from './item-list/item-list.component';
import { SearchComponent } from './search/search.component';
import { ChipSelectComponent } from './chip-select/chip-select.component';
@NgModule({
  imports: [EClinicSharedLibsModule, NgbModule, FlexLayoutModule],
  declarations: [
    // components
    JhiAlertComponent,
    JhiAlertErrorComponent,
    LoginFormComponent,
    GenericAutocompleteComponent,
    GenericModalComponent,
    DateTimeInputComponent,
    ItemListComponent,
    SearchComponent,
    ChipSelectComponent,
    // directives
    HasAnyAuthorityDirective,
    // pipes
    FindLanguageFromKeyPipe
  ],
  entryComponents: [LoginFormComponent],
  exports: [
    // modules
    EClinicSharedLibsModule,
    // components
    JhiAlertComponent,
    JhiAlertErrorComponent,
    LoginFormComponent,
    GenericAutocompleteComponent,
    GenericModalComponent,
    DateTimeInputComponent,
    ItemListComponent,
    SearchComponent,
    ChipSelectComponent,
    // directives
    HasAnyAuthorityDirective,
    // pipes
    FindLanguageFromKeyPipe
  ]
})
export class EClinicSharedModule {}
