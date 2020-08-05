/* eslint-disable @typescript-eslint/camelcase */
import gql from 'src/features/core/JobList/JobListQuery.graphql'
import { JobListQueryResponse } from 'src/features/core/JobList/types'
import graphqlClient from 'src/utilities/graphql/GraphQLClient'

export const queryJobList = async (): Promise<JobListQueryResponse> =>
  await graphqlClient.request(gql, {
    order_by: {
      scraper: 'asc',
      companyByCompanyId: { rating: 'desc' },
    },
    where: {
      created_at: { _gte: new Date().toISOString().split('T')[0] },
      _not: {
        companyByCompanyId: {
          user_ignores: {
            id: { _is_null: false },
          },
        },
      },
    },
  })
