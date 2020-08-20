import React, { FC } from 'react'
import { WithRouterProps } from 'next/dist/client/with-router'
import Link from 'next/link'
import { withRouter } from 'next/router'

type Props = WithRouterProps & {
  children: React.ReactNode,
  className?: string,
  href: string
};

const defaultNavLinkClasses =
  'block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700 cursor-pointer'

const NavLink: FC<Props> = ({ router, children, className = '', href }) => {
  if (router.pathname === href) {
    className += ' bg-gray-900 focus:outline-none'
  } else {
    className += ' text-gray-300'
  }
  return (
    <Link href={href}>
      <span className={className + ' ' + defaultNavLinkClasses}>{children}</span>
    </Link>
  )
}

export default withRouter(NavLink)
