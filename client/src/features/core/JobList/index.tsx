import React, { FC, useState } from 'react'
import ExclamationIcon from 'heroicons/solid/exclamation-circle.svg'

import Modal from 'src/components/Modal'
import JobCard from 'src/features/core/JobList/JobCard'
import { Company, JobListQueryResponse } from 'src/features/core/JobList/types'

const JobList: FC<JobListQueryResponse> = ({ jobs }) => {
  const [jobMenuOpened, setJobMenuOpened] = useState()
  const [companyToIgnore, setCompanyToIgnore] = useState<Company>()

  return (
    <div className='p-4 flex flex-col lg:w-1/2 lg:mx-auto'>
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
        jobs.map((job) => (
          <JobCard
            key={job.url}
            job={job}
            handleCompanyIgnore={(company) => setCompanyToIgnore(company)}
            handleMenuOpened={(url) => setJobMenuOpened(url)}
            isMenuOpened={job.url === jobMenuOpened}
          />
        ))
      )}
      {jobMenuOpened && (
        <button
          className='absolute top-0 left-0 w-screen h-screen'
          onClick={() => setJobMenuOpened(undefined)}
        />
      )}
      {companyToIgnore && (
        <Modal handleClose={() => setCompanyToIgnore(undefined)}>
          <div className='flex'>
            <div className='w-8 h-8 mr-4 text-red-600'>
              <ExclamationIcon />
            </div>
            <div className='flex flex-col max-w-md'>
              <div className='text-lg font-semibold'>
                Ignore Jobs from Company
              </div>
              <div className='text-gray-600 mt-2 mb-4'>
                Are you sure you want to ignore jobs from {companyToIgnore.name}
                ? Jobs will no longer display from this company. This action
                cannot be undone.
              </div>
              <div className='flex justify-end'>
                <button
                  autoFocus
                  className='px-5 py-2 rounded border border-gray-400'
                  onClick={() => setCompanyToIgnore(undefined)}
                >
                  Cancel
                </button>
                <button
                  className='px-5 py-2 ml-2 rounded bg-red-600 text-white'
                  onClick={() => {
                    fetch(
                      `/api/companies/${companyToIgnore.id}/setIgnoreFlag`,
                      {
                        method: 'POST',
                      }
                    )
                    setCompanyToIgnore(undefined)
                  }}
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default JobList
