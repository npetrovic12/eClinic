import { Component, OnInit } from '@angular/core';
import { SchedulerService } from './scheduler.service';

@Component({
  selector: 'jhi-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  dataSource: any;
  constructor(private schedulerService: SchedulerService) {}

  ngOnInit() {
    this.dataSource = [];
  }

  onUserSelected(user: any) {
    this.schedulerService.setSelectedUser(user);
  }
}
