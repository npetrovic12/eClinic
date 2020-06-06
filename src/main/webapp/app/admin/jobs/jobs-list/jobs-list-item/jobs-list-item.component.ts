import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../job.model';

@Component({
  selector: 'jobs-list-item',
  templateUrl: './jobs-list-item.component.html',
  styleUrls: ['./jobs-list-item.component.scss']
})
export class JobsListItemComponent implements OnInit {
  @Input() job: Job;

  constructor() {}

  ngOnInit() {}

  onJobClicked() {}
}
