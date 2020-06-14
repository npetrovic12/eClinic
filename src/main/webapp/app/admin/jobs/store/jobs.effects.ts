import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { JobsService } from '../jobs.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import * as JobsActions from '../store/jobs.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Injectable()
export class JobsEffects {
  // Load filtered jobs
  loadJobs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobsActions.tryGetJobs),
      withLatestFrom(this.store$.select(fromRoot.getJobsListPage), this.store$.select(fromRoot.getJobsSearchText)),
      switchMap(([action, page, searchText]) => {
        return this.jobsService.filter({ page, size: ITEMS_PER_PAGE, sort: ['id', 'desc'] }, null, null, null, searchText).pipe(
          map(res => JobsActions.getJobsSuccess({ jobs: res.data, count: res.totalItems })),
          catchError(res => of(JobsActions.getJobsError({ error: res })))
        );
      })
    );
  });

  // Add new job
  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobsActions.tryAddJob),
      switchMap(action => {
        return this.jobsService.create(action.job).pipe(
          map(res => JobsActions.addJobSuccess({ job: res.data })),
          catchError(res => of(JobsActions.addJobError({ error: res })))
        );
      })
    );
  });

  // Update a job
  updateJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobsActions.tryUpdateJob),
      switchMap(action => {
        return this.jobsService.update(action.job).pipe(
          map(res => JobsActions.updateJobSuccess({ job: res.data })),
          catchError(res => of(JobsActions.updateJobError({ error: res })))
        );
      })
    );
  });

  // Delete a job
  deleteJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobsActions.tryDeleteJob),
      switchMap(action => {
        return this.jobsService.delete(action.id).pipe(
          map(() => JobsActions.deleteJobSuccess({ id: action.id })),
          catchError(res => of(JobsActions.deleteJobError({ error: res })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private jobsService: JobsService, private store$: Store<fromRoot.State>) {}
}
