import { PayloadAction } from '@reduxjs/toolkit'

import { Company, Job, JobListQueryOptions } from 'src/features/core/JobList/api/graphql/types'

export type JobListSliceState = {
  // Initial API state
  queryOptions: JobListQueryOptions,
  isLoading: boolean,
  // API result
  jobs: Job[],
  // Web Socket state
  isAutoRefreshEnabled?: boolean,
  webSocketUpdateMessage?: string,
  refreshedJobs?: Job[],
  // Sorted API result
  categorizedJobs: { [keys: string]: Job[] },
  sortedScraperKeysByNumberOfJobs: string[],
  // User toggles
  jobMenuOpened?: string, // job.url
  companyStagedForIgnore?: Company // job.company
};

export type JobListSliceReducers = {
  setJobs: (state: JobListSliceState, action: PayloadAction<Job[]>) => void,
  updateJobsFromWebSocket: (state: JobListSliceState) => void,
  assignQueryOptions: (
    state: JobListSliceState,
    action: PayloadAction<Partial<JobListQueryOptions>>
  ) => void,
  setJobMenuOpened: (state: JobListSliceState, action: PayloadAction<string>) => void,
  setCompanyStagedForIgnore: (state: JobListSliceState, action: PayloadAction<Company>) => void,
  ignoreCompany: (state: JobListSliceState, action: PayloadAction<Company>) => void
};
