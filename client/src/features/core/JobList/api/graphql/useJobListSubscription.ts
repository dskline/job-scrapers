/* eslint-disable @typescript-eslint/camelcase */
import { useSubscription } from 'urql'

import query from 'src/features/core/JobList/api/graphql/JobListSubscription.graphql'
import { JobListQueryOptions } from 'src/features/core/JobList/types'

export const useJobListSubscription = (options: JobListQueryOptions, onReceiveData) => {
  const datePlusOne = new Date(options.date)
  datePlusOne.setDate(datePlusOne.getDate() + 1)

  return useSubscription(
    {
      query,
      variables: {
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
      },
    },
    (prev, data) => onReceiveData(data)
  )
}
