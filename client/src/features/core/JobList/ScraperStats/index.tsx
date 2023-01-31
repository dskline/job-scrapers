import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'src/config/redux/store'
import DateNavigator from 'src/features/core/JobList/ScraperStats/DateNavigator'

function ScraperStats (): React.ReactElement {
  const {
    isLoading,
    jobs,
    sortedScraperKeysByNumberOfJobs,
    categorizedJobs: jobsByScrapers,
  } = useSelector((state: RootState) => state.jobList)
  return (
    <div>
      <DateNavigator />
      {!isLoading && jobs.length > 0 && (
        <>
          <div className='text-center text-sm font-semibold text-gray-600 h-4'>
            ({jobs.length} jobs)
          </div>
          <div className='mt-8 mb-2 font-bold'>Scrapers</div>
          {sortedScraperKeysByNumberOfJobs.map((scraper) => {
            const percentageOfLargest =
              jobsByScrapers[scraper].length /
              jobsByScrapers[sortedScraperKeysByNumberOfJobs[0]].length

            return (
              <a
                key={scraper}
                href={`#${scraper}`}
              >
                <div className='mt-2 col-span-2 text-sm'>{scraper}</div>
                <div className='flex items-center'>
                  <div
                    className={`px-3 rounded-lg h-3 ${
                      percentageOfLargest < 0.3
                        ? 'bg-red-400'
                        : percentageOfLargest < 0.7
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{
                      width: `${percentageOfLargest * 100}%`,
                    }}
                  />
                  <span className='ml-3'>
                    {jobsByScrapers[scraper].length}
                  </span>
                </div>
              </a>
            )
          })}
        </>
      )}
    </div>
  )
}

export default ScraperStats
