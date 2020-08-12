import React, { ReactNode } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type ModalProps = {
  children: ReactNode,
  handleClose: () => void
};
const Modal = ({ children, handleClose }: ModalProps): JSX.Element => {
  useHotkeys('escape', handleClose)

  return (
    <div className='fixed top-0 left-0 w-screen h-screen z-50'>
      <div className='h-screen flex flex-col'>
        <CancelModalArea handleClose={handleClose} />
        <div className='flex'>
          <CancelModalArea handleClose={handleClose} />
          <div className='rounded bg-white p-5'>{children}</div>
          <CancelModalArea handleClose={handleClose} />
        </div>
        <CancelModalArea handleClose={handleClose} />
      </div>
    </div>
  )
}

const CancelModalArea = ({ handleClose }) => (
  <button
    className='flex-grow bg-gray-600 opacity-75 focus'
    onClick={handleClose}
    style={{ outline: 'none' }}
  />
)

export default Modal
