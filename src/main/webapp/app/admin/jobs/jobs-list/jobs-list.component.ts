import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../store/app.reducer';
import * as JobsActions from '../store/jobs.actions';
import { Job } from '../job.model';

@Component({
  selector: 'jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit, OnDestroy {
  jobs$: Observable<Job[]>;
  loadingJobsList$: Observable<boolean>;
  jobsCount$: Observable<number>;
  selectedJob$: Observable<Job>;
  page$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.loadingJobsList$ = this.store.select(fromRoot.getLoadingJobs);
    this.jobsCount$ = this.store.select(fromRoot.getJobsCount);
    this.selectedJob$ = this.store.select(fromRoot.getSelectedJob);
    this.jobs$ = this.store.select(fromRoot.getJobsList);
    this.page$ = this.store.select(fromRoot.getJobsListPage);
  }

  ngOnInit() {
    this.store.dispatch(JobsActions.tryGetJobs());
  }

  ngOnDestroy(): void {}

  onItemSelected(job: Job) {
    this.store.dispatch(JobsActions.setSelectedJob({ job }));
  }

  fetchJobs(pageIndex: number) {
    this.store.dispatch(JobsActions.setSelectedPage({ pageIndex }));
    this.store.dispatch(JobsActions.tryGetJobs());
  }
}
