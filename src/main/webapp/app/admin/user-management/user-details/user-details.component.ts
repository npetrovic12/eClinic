import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { JhiLanguageHelper } from 'app/core/language/language.helper';
import { User } from 'app/core/user/user.model';
import * as fromRoot from '../../../store/app.reducer';
import * as UserActions from '../store/user.actions';
import { UserService } from 'app/core/user/user.service';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  selectedUser$: Observable<User>;
  editMode$: Observable<boolean>;
  savingChange$: Observable<boolean>;

  mainForm: FormGroup;
  additionalForm: FormGroup;
  isDoctor = false;

  authorities: string[];
  selectedUser: User;
  languages: string[];

  onAuthoritites: Subscription;
  onUserSelected: Subscription;

  @ViewChild('nav', { static: false }) navigation: NgbNav;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private languageHelper: JhiLanguageHelper,
    private store: Store<fromRoot.State>
  ) {
    this.selectedUser$ = this.store.select(fromRoot.getSelectedUser);
    this.editMode$ = this.store.select(fromRoot.getUserEditMode);
    this.savingChange$ = this.store.select(fromRoot.getSavingUserChanges);
    this.languages = this.languageHelper.getAll();
  }

  ngOnInit() {
    this.onUserSelected = this.selectedUser$.subscribe(selectedUser => {
      if (this.selectedUser) this.navigation.select(1);
      this.selectedUser = selectedUser ? { ...selectedUser } : null;
      if (!selectedUser) return;

      this.mainForm = this.createMainForm();

      if (this.selectedUser.id && this.mainForm.controls['authorities'].value.includes('ROLE_DOCTOR')) {
        this.isDoctor = true;
        this.additionalForm = this.createAdditionalForm();
      } else {
        this.isDoctor = false;
        this.additionalForm = null;
      }
      this.mainForm.controls['authorities'].valueChanges.subscribe(value => {
        this.isDoctor = value.includes('ROLE_DOCTOR');
        if (this.isDoctor && !this.additionalForm) {
          this.additionalForm = this.createAdditionalForm();
        }
      });
    });

    this.onAuthoritites = this.userService.authorities().subscribe(res => {
      this.authorities = res;
    });
  }

  ngOnDestroy(): void {
    this.onUserSelected.unsubscribe();
    this.store.dispatch(UserActions.clearSelectedUser());
  }

  createMainForm() {
    return this.formBuilder.group({
      login: [this.selectedUser.login ? this.selectedUser.login : '', Validators.required],
      firstName: [this.selectedUser.firstName ? this.selectedUser.firstName : '', Validators.required],
      lastName: [this.selectedUser.lastName ? this.selectedUser.lastName : '', Validators.required],
      email: [this.selectedUser.email ? this.selectedUser.email : '', Validators.required],
      activated: [this.selectedUser.activated ? this.selectedUser.activated : false, Validators.required],
      langKey: [this.selectedUser.langKey ? this.selectedUser.langKey : null, Validators.required],
      authorities: [this.selectedUser.authorities ? this.selectedUser.authorities : null, Validators.required]
    });
  }

  createAdditionalForm() {
    return this.formBuilder.group({
      title: [this.selectedUser.title ? this.selectedUser.title : null, Validators.required],
      about: [this.selectedUser.title ? this.selectedUser.about : null]
    });
  }

  onSaveUser() {
    this.selectedUser = { ...this.selectedUser, ...this.mainForm.getRawValue() };
    if (this.additionalForm) this.selectedUser = { ...this.selectedUser, ...this.additionalForm.getRawValue() };
    if (!this.selectedUser.id) {
      this.store.dispatch(UserActions.tryAddUser({ user: this.selectedUser }));
      return;
    }
    this.store.dispatch(UserActions.tryUpdateUser({ user: this.selectedUser }));
  }

  onDeleteUser() {
    this.store.dispatch(UserActions.tryDeleteUser({ login: this.selectedUser.login }));
  }
}
