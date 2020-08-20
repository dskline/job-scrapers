/* eslint-disable @typescript-eslint/camelcase */
import gql from 'src/features/core/JobList/api/graphql/JobListQuery.graphql'
import { JobListQueryOptions, JobListQueryResponse } from 'src/features/core/JobList/types'
import graphqlClient from 'src/utilities/graphql/GraphQLClient'

export const queryJobList = async (options: JobListQueryOptions): Promise<JobListQueryResponse> => {
  const datePlusOne = new Date(options.date)
  datePlusOne.setDate(datePlusOne.getDate() + 1)

  return await graphqlClient.request(gql, {
    order_by: options.orderBy,
    where: {
      created_at: {
        _gte: options.date,
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
