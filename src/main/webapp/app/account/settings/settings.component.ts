import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { JhiLanguageHelper } from 'app/core/language/language.helper';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  error: string;
  success: string;
  languages: any[];
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [false],
    authorities: [[]],
    langKey: ['en'],
    login: [],
    image: [null],
    imageContentType: [null]
  });
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 128,
    resizeMaxWidth: 128,
    resizeQuality: 0.8
  };

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper
  ) {}

  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      this.updateForm(account);
    });
    this.languages = this.languageHelper.getAll();
  }

  save() {
    const settingsAccount = this.accountFromForm();
    this.accountService.save(settingsAccount).subscribe(
      () => {
        this.error = null;
        this.success = 'OK';
        this.accountService.identity(true).subscribe(account => {
          this.updateForm(account);
        });
        this.languageService.getCurrent().then(current => {
          if (settingsAccount.langKey !== current) {
            this.languageService.changeLanguage(settingsAccount.langKey);
          }
        });
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }

  private accountFromForm(): any {
    const account = {};
    return {
      ...account,
      firstName: this.settingsForm.get('firstName').value,
      lastName: this.settingsForm.get('lastName').value,
      email: this.settingsForm.get('email').value,
      activated: this.settingsForm.get('activated').value,
      authorities: this.settingsForm.get('authorities').value,
      langKey: this.settingsForm.get('langKey').value,
      login: this.settingsForm.get('login').value,
      image: this.settingsForm.get('image').value,
      imageContentType: this.settingsForm.get('imageContentType').value
    };
  }

  updateForm(account: Account): void {
    this.settingsForm.patchValue({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      activated: account.activated,
      authorities: account.authorities,
      langKey: account.langKey,
      login: account.login,
      image: account.image,
      imageContentType: account.imageContentType
    });
  }

  selected(imageResult: ImageResult) {
    const src = (imageResult.resized && imageResult.resized.dataURL) || imageResult.dataURL;
    console.log('type WORKING: s' + imageResult.file.type);
    console.log('type NOT WORKING: ' + imageResult.resized.type);
    this.settingsForm.patchValue({
      imageContentType: imageResult.file.type,
      image: src.substr(src.indexOf('base64,') + 'base64,'.length)
    });
  }

  convertUserImageURL() {
    const formValue = this.settingsForm.getRawValue();
    return `data:${formValue.imageContentType};base64,${formValue.image}`;
  }

  hasProfileImage() {
    const formValue = this.settingsForm.getRawValue();
    return !!formValue.image && !!formValue.imageContentType;
  }

  getUserFullName() {
    const formValue = this.settingsForm.getRawValue();
    return formValue.firstName + ' ' + formValue.lastName;
  }
}
