import React, { FC } from 'react'

const ScraperToggleItem: FC = () => (
  <div className='flex flex-col content-center justify-center w-16 h-16 bg-white mr-1'>
    <div className='rounded-full w-8 h-8 mx-auto' />
    <div
      className='text-sm w-11/12 mx-auto'
      style={{ textOverflow: 'ellipsis' }}
    >
      Glassdoor
    </div>
  </div>
)

export default ScraperToggleItem
