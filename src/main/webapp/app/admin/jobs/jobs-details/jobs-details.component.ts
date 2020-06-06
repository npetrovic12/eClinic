import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../job.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../../store/app.reducer';
import * as JobsActions from '../store/jobs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent implements OnInit, OnDestroy {
  editMode$: Observable<boolean>;
  selectedJob$: Observable<Job>;

  onSelectedJobChange: Subscription;

  selectedJob: Job;
  jobForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public store: Store<fromRoot.State>) {
    this.selectedJob$ = this.store.select(fromRoot.getSelectedJob);
    this.editMode$ = this.store.select(fromRoot.getJobEditMode);
  }

  ngOnInit() {
    this.onSelectedJobChange = this.selectedJob$.subscribe(selectedJob => {
      this.selectedJob = selectedJob ? { ...selectedJob } : null;
      if (!selectedJob) return;
      this.jobForm = this.createJobForm();
    });
  }

  ngOnDestroy(): void {
    this.onSelectedJobChange.unsubscribe();
  }

  createJobForm() {
    return this.formBuilder.group({
      title: [this.selectedJob.title ? this.selectedJob.title : '', Validators.required],
      description: [this.selectedJob.description ? this.selectedJob.description : ''],
      bookable: [this.selectedJob.bookable]
    });
  }

  onSaveJob() {
    this.selectedJob = { ...this.selectedJob, ...this.jobForm.getRawValue() };
    if (this.selectedJob.id) {
      this.store.dispatch(JobsActions.tryUpdateJob({ job: this.selectedJob }));
      return;
    }
    this.store.dispatch(JobsActions.tryAddJob({ job: this.selectedJob }));
  }

  onDeleteJob() {
    this.store.dispatch(JobsActions.tryDeleteJob({ id: this.selectedJob.id }));
  }
}
