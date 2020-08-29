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
    <>
      <DateNavigator />
      {!isLoading && jobs.length > 0 && (
        <>
          <div className='text-center text-sm font-semibold text-gray-600 h-4'>
            ({jobs.length} jobs)
          </div>
          <div className='mt-8 mb-2 font-bold'>Scrapers</div>
          <div className='flex w-11/12'>
            <div className='inline-flex flex-col pr-2'>
              {sortedScraperKeysByNumberOfJobs.map((scraper) => (
                <a
                  key={`scraperLabel${scraper}`}
                  href={`#${scraper}`}
                  className='h-8 flex content-center'
                >
                  <div className='my-auto'>{scraper}</div>
                </a>
              ))}
            </div>
            <div className='inline-flex flex-col flex-grow max-w-xs md:max-w-md w-11/12'>
              {sortedScraperKeysByNumberOfJobs.map((scraper) => {
                const percentageOfLargest =
                  jobsByScrapers[scraper].length /
                  jobsByScrapers[sortedScraperKeysByNumberOfJobs[0]].length
                return (
                  <a
                    key={`scraperBar${scraper}`}
                    href={`#${scraper}`}
                    className='h-8 flex content-center'
                  >
                    <div
                      className={`px-3 my-auto rounded-lg h-5 ${
                        percentageOfLargest < 0.3
                          ? 'bg-red-400'
                          : percentageOfLargest < 0.7
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        minWidth: `${percentageOfLargest * 100}%`,
                      }}
                    />
                    <span className='ml-3 float-right my-auto'>
                      {jobsByScrapers[scraper].length}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ScraperStats
