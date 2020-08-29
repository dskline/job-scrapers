import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import VerticalDotsIcon from 'heroicons/solid/dots-vertical.svg'
import OfficeBuildingIcon from 'heroicons/solid/office-building.svg'

import { RootState, useAppDispatch } from 'src/config/redux/store'
import { Job } from 'src/features/core/JobList/api/graphql/types'
import GlassdoorDetails from 'src/features/core/JobList/JobCard/GlassdoorDetails'
import { JOBLIST_ACTIONS } from 'src/features/core/JobList/store'

type JobCardProps = {
  job: Job
};
const JobCard: FC<JobCardProps> = ({ job }) => {
  const { jobMenuOpened } = useSelector((state: RootState) => state.jobList)
  const dispatch = useAppDispatch()

  return (
    <div className='border border-gray-400 bg-gray-100 rounded-b mt-3 p-4 pb-8 flex flex-col justify-between leading-normal'>
      <div className='flex'>
        <div className='flex-grow overflow-hidden'>
          <a
            href={job.url}
            target='_blank'
            rel='noreferrer noopener'
            className='flex flex-col flex-grow'
          >
            <div className='text-gray-900 font-bold text-xl'>{job.title}</div>
            <div className='flex content-center text-gray-600 text-sm'>
              <div className='flex my-auto'>
                <div className='h-3 w-3 mr-1'>
                  <OfficeBuildingIcon />
                </div>
              </div>
              <div className='capitalize truncate'>
                {job.company.name} • {job.company.industry}
              </div>
            </div>
          </a>
        </div>
        <div className='relative pl-2 z-20'>
          <button
            className='h-5 w-5'
            onClick={() => dispatch(JOBLIST_ACTIONS.setJobMenuOpened(job.url))}
          >
            <VerticalDotsIcon />
          </button>
          {jobMenuOpened === job.url && (
            <div className='absolute right-0 bg-white py-1 rounded-lg shadow-xl bg-gray-100 border border-gray-400'>
              <button
                className='block px-5 py-1 text-gray-800 hover:bg-indigo-500 hover:text-white whitespace-no-wrap'
                onClick={() => {
                  dispatch(JOBLIST_ACTIONS.setCompanyStagedForIgnore(job.company))
                  dispatch(JOBLIST_ACTIONS.setJobMenuOpened(undefined))
                }}
              >
                Ignore this Company
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center pt-8'>
        <GlassdoorDetails company={job.company} />
      </div>
    </div>
  )
}

export default JobCard
