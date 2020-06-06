import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as JobsActions from './store/jobs.actions';
import * as fromRoot from '../../store/app.reducer';
import { Job } from './job.model';
@Component({
  selector: 'jhi-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  constructor(private store: Store<fromRoot.State>) {}

  onNewJob() {
    this.store.dispatch(JobsActions.setSelectedJob({ job: new Job(null, null, null, false) }));
  }

  searchJobs(searchText: string) {
    this.store.dispatch(JobsActions.setSearchText({ searchText }));
    this.store.dispatch(JobsActions.setSelectedPage({ pageIndex: 0 }));
    this.store.dispatch(JobsActions.tryGetJobs());
  }
}
