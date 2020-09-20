import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Department } from 'app/core/user/department.enum';
import * as fromRoot from '../store/app.reducer';
import * as DepartmentActions from './store/departments.actions';
@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  defaultDepartment = Department.CARDIOLOGY;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.selectDepartment(this.defaultDepartment);
  }

  selectDepartment(department: Department) {
    this.store.dispatch(DepartmentActions.selectDepartment({ department }));
    this.store.dispatch(DepartmentActions.tryGetDepartmentData());
  }
}
