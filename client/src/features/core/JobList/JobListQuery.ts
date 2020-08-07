/* eslint-disable @typescript-eslint/camelcase */
import gql from 'src/features/core/JobList/JobListQuery.graphql'
import { JobListQueryResponse } from 'src/features/core/JobList/types'
import graphqlClient from 'src/utilities/graphql/GraphQLClient'

export const queryJobList = async (date: string): Promise<JobListQueryResponse> => {
  const datePlusOne = new Date(date)
  datePlusOne.setDate(datePlusOne.getDate() + 1)

  return await graphqlClient.request(gql, {
    order_by: {
      scraper: 'asc',
      company: { rating: 'desc' },
    },
    where: {
      created_at: {
        _gte: date,
        _lte: datePlusOne.toISOString().split('T')[0],
      },
      _not: {
        company: {
          user_ignores: {
            id: { _is_null: false },
          },
        },
      },
    },
  })
}
