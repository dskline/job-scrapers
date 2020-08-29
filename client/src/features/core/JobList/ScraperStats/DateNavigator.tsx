import React from 'react'
import { useSelector } from 'react-redux'
import CalendarIcon from 'heroicons/outline/calendar.svg'
import ArrowLeft from 'heroicons/solid/arrow-narrow-left.svg'
import ArrowRight from 'heroicons/solid/arrow-narrow-right.svg'
import Link from 'next/link'

import { RootState } from 'src/config/redux/store'

function DateNavigator (): React.ReactElement {
  const { queryOptions } = useSelector((state: RootState) => state.jobList)

  const todaysDate = fromDate(new Date(), 0)
  const previousDate = fromDate(queryOptions.date, -1)
  const nextDate = fromDate(queryOptions.date, 1)
  return (
    <div className='flex justify-center text-xl'>
      <Link href={`?date=${previousDate}`}>
        <span className='w-6 my-auto'>
          <span className='cursor-pointer' title='Navigate to previous date'>
            <ArrowLeft />
          </span>
        </span>
      </Link>
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
  )
}

const fromDate = (fromDate: string | Date, daysDelta: number): string => {
  const date = new Date(fromDate)
  date.setDate(date.getDate() + daysDelta)
  return date.toISOString().split('T')[0]
}

export default DateNavigator
