import React from 'react'
import { useSelector } from 'react-redux'
import ExclamationIcon from 'heroicons/solid/exclamation-circle.svg'

import Modal from 'src/components/Modal'
import { RootState, useAppDispatch } from 'src/config/redux/store'
import { JOBLIST_ACTIONS } from 'src/features/core/JobList/store'

function IgnoreCompanyModal (): React.ReactElement {
  const { companyStagedForIgnore } = useSelector((state: RootState) => state.jobList)
  const dispatch = useAppDispatch()

  return (
    <Modal handleClose={() => dispatch(JOBLIST_ACTIONS.setCompanyStagedForIgnore(undefined))}>
      <div className='flex'>
        <div className='w-8 h-8 mr-4 text-red-600'>
          <ExclamationIcon />
        </div>
        <div className='flex flex-col max-w-md'>
          <div className='text-lg font-semibold'>Ignore Jobs from Company</div>
          <div className='text-gray-600 mt-2 mb-4'>
            Are you sure you want to ignore jobs from {companyStagedForIgnore.name}? Jobs will no
            longer display from this company. This action cannot be undone.
          </div>
          <div className='flex justify-end'>
            <button
              autoFocus
              className='px-5 py-2 rounded border border-gray-400'
              onClick={() => {
                dispatch(JOBLIST_ACTIONS.setCompanyStagedForIgnore(undefined))
              }}
            >
              Cancel
            </button>
            <button
              className='px-5 py-2 ml-2 rounded bg-red-600 text-white'
              onClick={() => {
                dispatch(JOBLIST_ACTIONS.ignoreCompany(companyStagedForIgnore))
              }}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default IgnoreCompanyModal
