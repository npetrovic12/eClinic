import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  dataSource: any;
  constructor() {}

  ngOnInit() {
    this.dataSource = [];
  }
}
