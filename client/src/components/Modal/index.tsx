import React, { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode,
  handleClose: () => void
};
const Modal = ({ children, handleClose }: ModalProps): JSX.Element => (
  <>
    <button
      className='absolute top-0 left-0 w-screen h-screen z-40 bg-gray-600 opacity-75'
      onClick={handleClose}
    />
    <div className='absolute top-0 left-0 w-screen h-screen z-50'>
      <div className='flex items-center justify-center h-screen'>
        <div className='rounded bg-white p-5'>{children}</div>
      </div>
    </div>
  </>
)

export default Modal
