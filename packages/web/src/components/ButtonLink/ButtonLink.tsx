import React from 'react'

import { Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { Link, LinkProps } from 'react-router-dom'

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref as any} {...props} />,
)

type ButtonLinkProps = ButtonProps & LinkProps

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  return <Button component={AdapterLink} {...(props as any)} />
}

export default ButtonLink
