import React, { FC } from 'react'
import ExternalLinkIcon from 'heroicons/solid/external-link.svg'
import OfficeBuildingIcon from 'heroicons/solid/office-building.svg'

import GlassdoorDetails from 'src/features/core/JobList/GlassdoorDetails'
import { Job } from 'src/features/core/JobList/types'

const JobCard: FC<Job> = (props) => (
  <div className='border border-gray-400 bg-white rounded-b mt-3 p-4 pb-8 flex flex-col justify-between leading-normal'>
    <a
      href={props.url}
      target='_blank'
      rel='noreferrer noopener'
      className='flex'
    >
      <div className='flex-grow'>
        <div className='text-gray-900 font-bold text-xl'>{props.title}</div>
        <div className='flex content-center text-gray-600 text-sm'>
          <div className='flex my-auto'>
            <div className='h-3 w-3 mr-1'>
              <OfficeBuildingIcon />
            </div>
          </div>
          <div className='capitalize truncate'>
            {props.company.name} • {props.company.industry}
          </div>
        </div>
      </div>
      <div className='h-5 w-5'>
        <ExternalLinkIcon />
      </div>
    </a>
    <div className='flex justify-center pt-8'>
      <GlassdoorDetails company={props.company} />
    </div>
  </div>
)

export default JobCard
