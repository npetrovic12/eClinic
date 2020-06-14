import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EClinicSharedModule } from 'app/shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { userManagementRoute } from './user-management.route';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [EClinicSharedModule, RouterModule.forChild([userManagementRoute]), FlexLayoutModule],
  declarations: [UserManagementComponent, UserListComponent, UserListItemComponent, UserDetailsComponent]
})
export class UserManagementModule {}
