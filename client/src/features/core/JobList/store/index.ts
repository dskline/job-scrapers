import { OrderBy } from 'src/@types/generated/graphql'
import { createAppSlice } from 'src/config/redux/createHelper'
import { Job, JobListSliceReducers, JobListSliceState } from 'src/features/core/JobList/types'

const jobListSlice = createAppSlice<JobListSliceState, JobListSliceReducers>({
  name: 'jobList',
  initialState: {
    isLoading: true,
    isAutoRefreshEnabled: true,
    jobs: [],
    queryOptions: {
      date: new Date().toISOString().split('T')[0],
      orderBy: {
        company: { rating: OrderBy.Desc },
      },
    },
  },
  reducers: {
    setJobs (state, action): void {
      if (state.isLoading || state.isAutoRefreshEnabled) {
        // Set initial jobs
        state.jobs = action.payload
        state.categorizedJobs = categorizeJobsByScraper(state.jobs)
        state.isLoading = false
      } else {
        // Subsequent web socket data updates should be queued up for refreshing
        const maxLength = Math.max(state.jobs.length, action.payload.length)
        for (let i = 0; i < maxLength; i++) {
          if (state.jobs[i]?.url !== action.payload[i]?.url) {
            state.webSocketUpdateMessage = 'Job data has been updated'
            state.refreshedJobs = action.payload
          }
        }
      }
    },
    updateJobsFromWebSocket (state): void {
      state.webSocketUpdateMessage = undefined
      state.jobs = state.refreshedJobs
      state.categorizedJobs = categorizeJobsByScraper(state.jobs)
    },
    assignQueryOptions (state, action): void {
      state.isLoading = true
      state.queryOptions = Object.assign(state.queryOptions, action.payload)
    },
    setJobMenuOpened (state, action): void {
      state.jobMenuOpened = action.payload
    },
    setCompanyStagedForIgnore (state, action): void {
      state.companyStagedForIgnore = action.payload
    },
    ignoreCompany (state, action): void {
      state.companyStagedForIgnore = undefined
      state.jobs = state.jobs.filter((job) => job.company.id !== action.payload.id)
      state.categorizedJobs = categorizeJobsByScraper(state.jobs)
      fetch(`/api/companies/${action.payload.id}/setIgnoreFlag`, {
        method: 'POST',
      })
    },
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

export const JOBLIST_ACTIONS = { ...jobListSlice.actions }
export const reducer = jobListSlice.reducer
