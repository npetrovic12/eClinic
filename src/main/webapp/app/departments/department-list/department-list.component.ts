import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
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
  @Input() defaultDepartment = Department.CARDIOLOGY;
  @Output() departmentChanged = new EventEmitter<Department>();

  departmentValue(index, department: DepartmentOption) {
    return department.value;
  }

  onDepartmentChange(eventData: NgbNavChangeEvent) {
    this.departmentChanged.emit(eventData.nextId);
  }
}
