import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'src/config/redux/store'
import JobCard from 'src/features/core/JobList/JobCard/JobCard'
import ScraperStats from 'src/features/core/JobList/ScraperStats'

function SortedJobList (): React.ReactElement {
  const { categorizedJobs: jobsByScrapers } = useSelector((state: RootState) => state.jobList)
  const sortedScraperKeys = Object.keys(jobsByScrapers).sort(
    (a, b) => jobsByScrapers[b].length - jobsByScrapers[a].length
  )
  return (
    <>
      <hr />
      <ScraperStats sortedScraperKeys={sortedScraperKeys} />
      {sortedScraperKeys.map((scraper) => (
        <div key={`scraperJobs${scraper}`} id={scraper} className='mb-12'>
          <a href={`#${scraper}`}>
            <h2 className='border rounded-lg py-2 px-4 bg-indigo-500 text-indigo-100 text-xl capitalize italic'>
              # {scraper}
            </h2>
          </a>
          {jobsByScrapers[scraper].map((job) => (
            <JobCard key={job.url} job={job} />
          ))}
        </div>
      ))}
    </>
  )
}

export default SortedJobList
