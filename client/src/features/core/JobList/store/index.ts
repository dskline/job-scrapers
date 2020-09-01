import { createAppSlice } from 'src/config/redux/createHelper'
import { Job } from 'src/features/core/JobList/api/graphql/types'
import { JobListSliceReducers, JobListSliceState } from 'src/features/core/JobList/store/types'
import { OrderBy } from 'src/features/integrations/graphql/types'

const jobListSlice = createAppSlice<JobListSliceState, JobListSliceReducers>({
  name: 'jobList',
  initialState: {
    isLoading: true,
    isAutoRefreshEnabled: true,
    jobs: [],
    categorizedJobs: {},
    sortedScraperKeysByNumberOfJobs: [],
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
        Object.assign(state, setJobs(action.payload))
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
      Object.assign(state, setJobs(state.refreshedJobs))
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
      Object.assign(
        state,
        setJobs(state.jobs.filter((job) => job.company.id !== action.payload.id))
      )
      fetch(`/api/companies/${action.payload.id}/setIgnoreFlag`, {
        method: 'POST',
      })
    },
  },
})

function setJobs (jobs: Job[]): Partial<JobListSliceState> {
  const categorizedJobs = jobs.reduce((previousValue, currentValue) => {
    if (!previousValue[currentValue.scraper]) {
      previousValue[currentValue.scraper] = [currentValue]
    } else {
      previousValue[currentValue.scraper].push(currentValue)
    }
    return previousValue
  }, {})

  return {
    jobs,
    categorizedJobs,
    sortedScraperKeysByNumberOfJobs: Object.keys(categorizedJobs).sort(
      (a, b) => categorizedJobs[b].length - categorizedJobs[a].length
    ),
  }
}

export const JOBLIST_ACTIONS = { ...jobListSlice.actions }
export const reducer = jobListSlice.reducer
