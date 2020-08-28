import { PayloadAction } from '@reduxjs/toolkit'

import { JobsOrderBy } from 'src/@types/generated/graphql'

export type Company = {
  id: string,
  name: string,
  industry: string,
  rating: number,
  ratingHtml: string,
  glassdoorUrl: string
};

export type Job = {
  company: Company,
  title: string,
  scraper: string,
  url: string
};

export type JobListQueryOptions = {
  date: string,
  orderBy: JobsOrderBy
};

export type JobListSliceState = {
  queryOptions: JobListQueryOptions,
  isLoading: boolean,
  isAutoRefreshEnabled?: boolean,
  webSocketUpdateMessage?: string,
  jobs: Job[],
  refreshedJobs?: Job[],
  categorizedJobs?: { [keys: string]: Job[] },
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
