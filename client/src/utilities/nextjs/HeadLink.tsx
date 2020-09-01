import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;

const HeadLink: FC<Props> = (props) => {
  const { href, ...rest } = props
  return <link {...rest} href={href.replace('/public', '')} />
}

export default HeadLink
