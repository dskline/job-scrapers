import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'src/config/redux/store'

type Props = {
  sortedScraperKeys: string[]
};
function ScraperStats ({ sortedScraperKeys }): React.ReactElement<Props> {
  const { categorizedJobs: jobsByScrapers } = useSelector((state: RootState) => state.jobList)
  return (
    <div className='my-4'>
      <div className='text-2xl'>Scraper Stats</div>
      <div className='flex mt-4 mb-8 w-11/12'>
        <div className='inline-flex flex-col'>
          {sortedScraperKeys.map((scraper) => (
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
          {sortedScraperKeys.map((scraper) => {
            const percentageOfLargest =
              jobsByScrapers[scraper].length / jobsByScrapers[sortedScraperKeys[0]].length
            return (
              <a
                key={`scraperBar${scraper}`}
                href={`#${scraper}`}
                className='h-8 flex content-center'
              >
                <div
                  className={`mx-3 my-auto rounded-lg h-5 ${
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
                <span className='float-right my-auto'>{jobsByScrapers[scraper].length}</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScraperStats
