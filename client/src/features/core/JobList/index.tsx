import React from 'react'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from 'src/config/redux/store'
import IgnoreCompanyModal from 'src/features/core/JobList/IgnoreCompanyModal'
import SortedJobList from 'src/features/core/JobList/SortedJobList'
import { JOBLIST_ACTIONS } from 'src/features/core/JobList/store'

function JobList (): React.ReactElement {
  const { jobs, jobMenuOpened, companyStagedForIgnore } = useSelector(
    (state: RootState) => state.jobList
  )
  const dispatch = useAppDispatch()

  return (
    <div className='p-4 flex flex-col lg:w-1/2 lg:mx-auto'>
      {jobs.length === 0 ? (
        <div className='text-center py-8 bg-white mt-3'>
          <div>No jobs found today, try again tomorrow.</div>
        </div>
      ) : (
        <SortedJobList />
      )}
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
