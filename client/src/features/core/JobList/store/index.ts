import { createAsyncThunk } from '@reduxjs/toolkit'

import { createAppSlice } from 'src/config/redux/createHelper'
import { RootState } from 'src/config/redux/store'
import { queryJobList } from 'src/features/core/JobList/api/graphql/JobListQuery'
import {
  Job,
  JobListQueryResponse,
  JobListSliceReducers,
  JobListSliceState,
} from 'src/features/core/JobList/types'

const fetchJobList = createAsyncThunk<JobListQueryResponse, void, { state: RootState }>(
  'jobList/fetchJobList',
  async (_, { getState }) => {
    try {
      return await queryJobList(getState().jobList.queryOptions)
    } catch (e) {
      console.error(e)
    }
  }
)

const jobListSlice = createAppSlice<JobListSliceState, JobListSliceReducers>({
  name: 'jobList',
  initialState: {
    isLoading: true,
    isJobsCategorizedFlag: true,
    queryOptions: {
      date: new Date().toISOString().split('T')[0],
      orderBy: {
        company: { rating: 'desc' },
      },
    },
  },
  reducers: {
    assignQueryOptions (state, action) {
      state.queryOptions = Object.assign(state.queryOptions, action.payload)
    },
    toggleIsJobsCategorizedFlag (state) {
      state.isJobsCategorizedFlag = !state.isJobsCategorizedFlag
    },
    setJobMenuOpened (state, action) {
      state.jobMenuOpened = action.payload
    },
    setCompanyStagedForIgnore (state, action) {
      state.companyStagedForIgnore = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobList.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs
      if (state.isJobsCategorizedFlag) {
        state.categorizedJobs = categorizeJobsByScraper(action.payload.jobs)
      }
      state.isLoading = false
    })
  },
})

function categorizeJobsByScraper (jobs: Job[]): { [keys: string]: Job[] } {
  return jobs.reduce((previousValue, currentValue) => {
    if (!previousValue[currentValue.scraper]) {
      previousValue[currentValue.scraper] = [currentValue]
    } else {
      previousValue[currentValue.scraper].push(currentValue)
    }
    return previousValue
  }, {})
}

export const JOBLIST_ACTIONS = { fetchJobList, ...jobListSlice.actions }
export const reducer = jobListSlice.reducer
