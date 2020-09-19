import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'app/core/user/department.enum';
import { DepartmentOption, departmentOptions } from 'app/core/user/user.model';

@Component({
  selector: 'department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentListComponent {
  departmentOptions = departmentOptions;
  @Output() departmentChanged = new EventEmitter<Department>();

  departmentValue(index, department: DepartmentOption) {
    return department.value;
  }

  onNavChange(eventData: NgbNavChangeEvent) {
    this.departmentChanged.emit(eventData.nextId);
  }
}
