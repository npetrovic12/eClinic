import { Job } from '../job.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as JobsActios from './jobs.actions';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export const jobsFeatureKey = 'jobs';

export interface State {
  selectedJob: Job;
  list: Job[];
  editMode: boolean;
  count: number;
  page: number;
  searchText: string;
  loadingJobs: boolean;
  loadingJob: boolean;
  savingChanges: boolean;
  restError: any;
}

export const initialState: State = {
  selectedJob: null,
  list: [],
  editMode: false,
  count: 0,
  page: 0,
  searchText: '',
  loadingJobs: false,
  loadingJob: false,
  savingChanges: false,
  restError: null
};

const jobsReducer = createReducer(
  initialState,
  on(JobsActios.tryGetJobs, state => ({ ...state, loadingJobs: true })),
  on(JobsActios.getJobsSuccess, (state, action) => ({
    ...state,
    loadingJobs: false,
    list: [...action.jobs],
    count: action.count
  })),
  on(JobsActios.getJobsError, (state, action) => ({
    ...state,
    loadingJobs: false,
    restError: { ...action.error }
  })),
  on(JobsActios.tryDeleteJob, state => ({ ...state, savingChanges: true })),
  on(JobsActios.deleteJobSuccess, (state, action) => ({
    ...state,
    editMode: false,
    savingChanges: false,
    selectedJob: null,
    count: state.count - 1,
    jobsList: state.list.filter(job => job.id !== action.id)
  })),
  on(JobsActios.deleteJobError, (state, action) => ({
    ...state,
    savingChanges: false,
    restError: action.error
  })),
  on(JobsActios.tryAddJob, state => ({ ...state, savingChanges: true })),
  on(JobsActios.addJobSuccess, (state, action) => ({
    ...state,
    savingChanges: false,
    editMode: true,
    count: state.count + 1,
    selectedJob: action.job,
    jobsList: [action.job, ...state.list]
  })),
  on(JobsActios.addJobError, (state, action) => ({
    ...state,
    savingChanges: false,
    restError: action.error
  })),
  on(JobsActios.tryUpdateJob, state => ({ ...state, savingChanges: true })),
  on(JobsActios.updateJobSuccess, (state, action) => ({
    ...state,
    savingChanges: false,
    selectedJob: action.job,
    editMode: true,
    jobsList: state.list.map(job => {
      if (job.id === action.job.id) return action.job;
      return job;
    })
  })),
  on(JobsActios.updateJobError, (state, action) => ({ ...state, savingChanges: false, restError: action.error })),
  on(JobsActios.setSelectedJob, (state, action) => ({ ...state, selectedJob: action.job, editMode: !!action.job.id })),
  on(JobsActios.setSelectedPage, (state, action) => ({ ...state, page: action.pageIndex })),
  on(JobsActios.setSearchText, (state, action) => ({ ...state, searchText: action.searchText }))
);

export function reducer(state: State | undefined, action: Action) {
  return jobsReducer(state, action);
}

export const getSelectedJob = (state: State) => state.selectedJob;
export const getJobsList = (state: State) => state.list;
export const getEditMode = (state: State) => state.editMode;
export const getCount = (state: State) => state.count;
export const getLoadingJobs = (state: State) => state.loadingJobs;
export const getLoadingJob = (state: State) => state.loadingJob;
export const getSavingChanges = (state: State) => state.savingChanges;
export const getRestError = (state: State) => state.restError;
export const getPageIndex = (state: State) => state.page;
export const getSearchText = (state: State) => state.searchText;
