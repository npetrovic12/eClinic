import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'department-user-card',
  templateUrl: './department-user-card.component.html',
  styleUrls: ['./department-user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentUserCardComponent implements OnInit {
  @Input() user: User;
  @Output() newAppointmentSelected = new EventEmitter<User>();

  constructor() {}

  ngOnInit() {}

  convertUserImageURL() {
    return `data:${this.user.imageContentType};base64,${this.user.image}`;
  }

  userHasImage() {
    return !!this.user.image && !!this.user.imageContentType;
  }

  userIsDoctor() {
    return !!this.user.authorities.filter(authority => authority.name === 'ROLE_DOCTOR').length;
  }

  onSchedulerLinkClick() {
    this.newAppointmentSelected.emit(this.user);
  }
}
