import React, { FC } from 'react'

import { Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { Link, LinkProps } from 'react-router-dom'

export const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref as any} {...props} />,
)

export type LinkButtonProps = ButtonProps & LinkProps

const LinkButton: FC<LinkButtonProps> = (props) => {
  return <Button component={AdapterLink as any} {...props} />
}

export default LinkButton
