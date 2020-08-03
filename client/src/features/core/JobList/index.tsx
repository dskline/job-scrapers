import React, { FC } from 'react'

import JobCard from 'src/features/core/JobList/JobCard'
import ScraperToggleBar from 'src/features/core/JobList/ScraperToggleBar'
import { JobListQueryResponse } from 'src/features/core/JobList/types'

const JobList: FC<JobListQueryResponse> = ({ jobs }) => (
  <div className='p-4 flex flex-col lg:w-1/2 lg:mx-auto'>
    <ScraperToggleBar />
    {jobs.length === 0 ? (
      <div className='text-center py-8 bg-white mt-3'>
        <div>No jobs found today, try again tomorrow.</div>
        <button
          className='border bg-gray-800 px-3 py-1 text-white rounded mt-4'
          onClick={() => fetch('/api/jobs/scrape', { method: 'POST' })}
        >
          Send a Refresh Request
        </button>
      </div>
    ) : (
      jobs.map((job) => <JobCard key={job.url} {...job} />)
    )}
  </div>
)

export default JobList
