import React from 'react'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'

import { RootState, store, useAppDispatch } from 'src/config/redux/store'
import JobList from 'src/features/core/JobList'
import { useJobListSubscription } from 'src/features/core/JobList/api/graphql/useJobListSubscription'
import { JOBLIST_ACTIONS } from 'src/features/core/JobList/store'
import BasePage from 'src/templates/core/BasePage'

const JobListPage: NextPage = () => {
  const { queryOptions } = useSelector((state: RootState) => state.jobList)
  const dispatch = useAppDispatch()
  useJobListSubscription(queryOptions, ({ jobs }) => dispatch(JOBLIST_ACTIONS.setJobs(jobs)))

  return (
    <BasePage>
      <JobList />
    </BasePage>
  )
}

export const getServerSideProps = store.getServerSideProps(async ({ query, store }) => {
  const desiredDate = (query.date as string) ?? new Date().toISOString().split('T')[0]
  store.dispatch(JOBLIST_ACTIONS.assignQueryOptions({ date: desiredDate }))
})

export default JobListPage
