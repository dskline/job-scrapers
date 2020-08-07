import React from 'react'
import { GetServerSideProps, NextPage } from 'next'

import JobList from 'src/features/core/JobList'
import { queryJobList } from 'src/features/core/JobList/JobListQuery'
import { JobListQueryResponse } from 'src/features/core/JobList/types'
import BasePage from 'src/templates/core/BasePage'

type JobListPageProps = JobListQueryResponse & {
  previousDate: string,
  nextDate: string,
  isLastResultPage: boolean
};

const JobListPage: NextPage<JobListPageProps> = ({
  jobs,
  previousDate,
  nextDate,
  isLastResultPage,
}) => (
  <BasePage>
    <JobList jobs={jobs} />
    <div className='text-center pb-24'>
      <a href={`/?date=${previousDate}`}>{'<- Previous Date'}</a>
      {!isLastResultPage && (
        <>
          <span className='px-4'>|</span>
          <a href={`/?date=${nextDate}`}>{'Next Date ->'}</a>
        </>
      )}
    </div>
  </BasePage>
)

export const getServerSideProps: GetServerSideProps<JobListPageProps> = async ({
  query,
}) => {
  const todaysDate = new Date().toISOString().split('T')[0]
  const desiredDate = (query.date || todaysDate) as string

  const previousDate = new Date(desiredDate)
  previousDate.setDate(previousDate.getDate() - 1)

  const nextDate = new Date(desiredDate)
  nextDate.setDate(nextDate.getDate() + 1)

  return {
    props: {
      isLastResultPage: todaysDate === desiredDate,
      previousDate: previousDate.toISOString().split('T')[0],
      nextDate: nextDate.toISOString().split('T')[0],
      ...(await queryJobList(desiredDate)),
    },
  }
}

export default JobListPage
