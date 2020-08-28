import React from 'react'
import { useSelector } from 'react-redux'
import CalendarIcon from 'heroicons/outline/calendar.svg'
import ArrowLeft from 'heroicons/solid/arrow-narrow-left.svg'
import ArrowRight from 'heroicons/solid/arrow-narrow-right.svg'
import { NextPage } from 'next'
import Link from 'next/link'

import { RootState, store, useAppDispatch } from 'src/config/redux/store'
import JobList from 'src/features/core/JobList'
import { useJobListSubscription } from 'src/features/core/JobList/api/graphql/useJobListSubscription'
import { JOBLIST_ACTIONS } from 'src/features/core/JobList/store'
import BasePage from 'src/templates/core/BasePage'

const JobListPage: NextPage = () => {
  const { queryOptions, isLoading } = useSelector((state: RootState) => state.jobList)
  const dispatch = useAppDispatch()
  useJobListSubscription(queryOptions, ({ jobs }) => dispatch(JOBLIST_ACTIONS.setJobs(jobs)))

  const todaysDate = fromDate(new Date(), 0)
  const previousDate = fromDate(queryOptions.date, -1)
  const nextDate = fromDate(queryOptions.date, 1)

  return (
    <BasePage>
      <div className='flex justify-center text-xl pt-4'>
        <span className='w-6 my-auto'>
          <Link href={`?date=${previousDate}`}>
            <span className='cursor-pointer' title='Navigate to previous date'>
              <ArrowLeft />
            </span>
          </Link>
        </span>
        <div className='flex content-center px-6'>
          <div className='flex my-auto'>
            <div className='h-5 w-5 mr-3'>
              <CalendarIcon />
            </div>
          </div>
          <div>{queryOptions.date.replace(/-/g, '/')}</div>
        </div>
        <span className='w-6 my-auto'>
          {nextDate <= todaysDate && (
            <Link href={`?date=${nextDate}`}>
              <span className='cursor-pointer' title='Navigate to next date'>
                <ArrowRight />
              </span>
            </Link>
          )}
        </span>
      </div>
      {!isLoading && <JobList />}
    </BasePage>
  )
}

const fromDate = (fromDate: string | Date, daysDelta: number): string => {
  const date = new Date(fromDate)
  date.setDate(date.getDate() + daysDelta)
  return date.toISOString().split('T')[0]
}

export const getServerSideProps = store.getServerSideProps(async ({ query, store }) => {
  const desiredDate = (query.date as string) ?? new Date().toISOString().split('T')[0]
  store.dispatch(JOBLIST_ACTIONS.assignQueryOptions({ date: desiredDate }))
})

export default JobListPage
