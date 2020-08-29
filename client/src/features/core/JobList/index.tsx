import React from 'react'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from 'src/config/redux/store'
import IgnoreCompanyModal from 'src/features/core/JobList/IgnoreCompanyModal'
import ScraperStats from 'src/features/core/JobList/ScraperStats'
import SortedJobList from 'src/features/core/JobList/SortedJobList'
import { JOBLIST_ACTIONS } from 'src/features/core/JobList/store'

function JobList (): React.ReactElement {
  const { jobs, jobMenuOpened, companyStagedForIgnore, isLoading } = useSelector(
    (state: RootState) => state.jobList
  )
  const dispatch = useAppDispatch()

  return (
    <div className='pt-8 px-4 flex flex-col lg:h-screen md:mx-auto md:w-4/5 lg:w-5/6 lg:flex-row xl:w-3/4'>
      <div className='mb-8 lg:w-1/4 lg:fixed'>
        <ScraperStats />
      </div>
      <div className='hidden lg:inline-block lg:w-1/4' />
      <div className='lg:w-3/4 lg:pl-32 lg:overflow-auto'>
        {!isLoading && jobs.length === 0 ? (
          <div className='bg-white h-64 pt-8 text-center rounded text-xl'>
            No jobs found today, try again tomorrow.
          </div>
        ) : (
          <SortedJobList />
        )}
      </div>
      {jobMenuOpened && (
        <button
          className='absolute top-0 left-0 w-screen h-screen'
          onClick={() => dispatch(JOBLIST_ACTIONS.setJobMenuOpened(undefined))}
        />
      )}
      {companyStagedForIgnore && <IgnoreCompanyModal />}
    </div>
  )
}

export default JobList
