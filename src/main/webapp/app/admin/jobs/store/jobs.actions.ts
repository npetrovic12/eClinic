import { createAction, props } from '@ngrx/store';
import { Job } from '../job.model';

// Get jobs
export const tryGetJobs = createAction('[Jobs] Try get jobs');
export const getJobsSuccess = createAction('[Jobs] Get jobs success', props<{ jobs: Job[]; count: number }>());
export const getJobsError = createAction('[Jobs] Get jobs error', props<{ error: any }>());

// Delete a job
export const tryDeleteJob = createAction('[Jobs] Try delete job', props<{ id: string }>());
export const deleteJobSuccess = createAction('[Jobs] Delete job success', props<{ id: string }>());
export const deleteJobError = createAction('[Jobs] Delete job error', props<{ error: any }>());

// Add a job
export const tryAddJob = createAction('[Jobs] Try add job', props<{ job: Job }>());
export const addJobSuccess = createAction('[Jobs] Add job success', props<{ job: Job }>());
export const addJobError = createAction('[Jobs] Create job error', props<{ error: any }>());

// Update a job
export const tryUpdateJob = createAction('[Jobs] Try update a job', props<{ job: Job }>());
export const updateJobSuccess = createAction('[Jobs] Update job success', props<{ job: Job }>());
export const updateJobError = createAction('[Jobs] Update job error', props<{ error: any }>());

// Change selected job
export const setSelectedJob = createAction('[Jobs] Set selected job', props<{ job: Job }>());

// Try load new page
export const setSelectedPage = createAction('[Jobs] Set selected page', props<{ pageIndex: number }>());

// Set search text
export const setSearchText = createAction('[Jobs] Set search text', props<{ searchText: string }>());
