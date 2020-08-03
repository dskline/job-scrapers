import React from 'react'
import { GetServerSideProps, NextPage } from 'next'

import JobList from 'src/features/core/JobList'
import { queryJobList } from 'src/features/core/JobList/JobListQuery'
import { JobListQueryResponse } from 'src/features/core/JobList/types'
import BasePage from 'src/templates/core/BasePage'

const HomePage: NextPage<JobListQueryResponse> = ({ jobs }) => (
  <BasePage>
    <JobList jobs={jobs} />
  </BasePage>
)

export const getServerSideProps: GetServerSideProps<JobListQueryResponse> = async () => ({
  props: await queryJobList(),
})

export default HomePage
