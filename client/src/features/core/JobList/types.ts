import { PayloadAction } from '@reduxjs/toolkit'

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

export type JobListQueryResponse = {
  jobs: Array<Job>
};
export type JobListQueryOptions = {
  date: string,
  orderBy: {
    company?: {
      rating?: 'asc' | 'desc'
    },
    scraper?: 'asc' | 'desc'
  }
};

export type JobListSliceState = {
  queryOptions: JobListQueryOptions,
  isLoading: boolean,
  jobs?: Job[],
  categorizedJobs?: { [keys: string]: Job[] },
  isJobsCategorizedFlag: boolean,
  jobMenuOpened?: string, // job.url
  companyStagedForIgnore?: Company // job.company
};
export type JobListSliceReducers = {
  assignQueryOptions: (
    state: JobListSliceState,
    action: PayloadAction<Partial<JobListQueryOptions>>
  ) => void,
  toggleIsJobsCategorizedFlag: (state: JobListSliceState) => void,
  setJobMenuOpened: (state: JobListSliceState, action: PayloadAction<string>) => void,
  setCompanyStagedForIgnore: (state: JobListSliceState, action: PayloadAction<Company>) => void
};
