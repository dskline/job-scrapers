import React, { FC } from 'react'
import StarRatings from 'react-star-ratings'
import RefreshIcon from 'heroicons/solid/refresh.svg'

import { Company } from 'src/features/core/JobList/types'

type Props = {
  company: Company
};

const GlassdoorDetails: FC<Props> = (props) => (
  <a
    className='h-24 border border-rounded pb-4'
    href={props.company.glassdoorUrl}
    target='_blank'
    rel='noreferrer noopener'
  >
    <div className='flex justify-center overflow-hidden opacity-50 h-24 relative py-1 px-2'>
      {props.company.ratingHtml ? (
        <div dangerouslySetInnerHTML={{ __html: props.company.ratingHtml }} />
      ) : (
        <div className='flex min-h-full'>
          <button
            className='w-8 h-8 my-auto'
            onClick={() =>
              fetch(`/api/companies/${props.company.id}/requestUpdate`, {
                method: 'POST',
              })}
          >
            <RefreshIcon />
          </button>
        </div>
      )}
    </div>
    <div
      className='flex content-center justify-center z-10 relative'
      style={{ top: '-1rem' }}
    >
      <div className='flex border rounded px-4 bg-white'>
        <div className='text-green-600 font-extrabold text-right my-auto mr-2'>
          {props.company.rating}
        </div>
        <div className='pb-1'>
          <StarRatings
            rating={props.company.rating}
            starRatedColor='#38a169'
            name={`company rating (${props.company.rating})`}
            starDimension='1rem'
            starSpacing='0'
          />
        </div>
      </div>
    </div>
  </a>
)

export default GlassdoorDetails
